import test from 'node:test';
import assert from 'node:assert/strict';

async function loadSetup() {
  const module = await import('../src/lib/analytics-consent.mjs').catch(() => null);
  assert.ok(module, 'analytics consent module must exist');
  return module.setupAnalyticsConsent;
}

function fixture(hostname = 'zerocompanytactics.com') {
  const events = new Map();
  const storage = new Map();
  const appendedScripts = [];
  const elements = new Map();
  const trackableLink = {
    dataset: { analyticsItem: 'classes' },
    addEventListener(type, handler) { events.set(`trackable:${type}`, handler); },
  };

  for (const id of ['analytics-consent', 'analytics-accept', 'analytics-reject', 'analytics-choices']) {
    elements.set(id, {
      hidden: id === 'analytics-consent',
      addEventListener(type, handler) { events.set(`${id}:${type}`, handler); },
    });
  }

  const document = {
    head: { append(element) { appendedScripts.push(element); } },
    createElement(tagName) { return { tagName, async: false, src: '' }; },
    getElementById(id) { return elements.get(id) ?? null; },
    querySelectorAll() { return [trackableLink]; },
  };
  const window = {
    location: { hostname },
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); },
    },
  };

  return { window, document, events, storage, appendedScripts, elements };
}

const options = {
  measurementId: 'G-P95CVSH72Z',
  productionHost: 'zerocompanytactics.com',
  storageKey: 'zero_company_tactics_analytics_consent',
};

test('defaults every Consent Mode v2 key to denied without loading Google', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture();
  setupAnalyticsConsent({ ...page, ...options });

  assert.deepEqual([...page.window.dataLayer[0]], ['consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  }]);
  assert.equal(page.appendedScripts.length, 0);
  assert.equal(page.elements.get('analytics-consent').hidden, false);
});

test('accept grants analytics only and loads the approved tag once', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture();
  setupAnalyticsConsent({ ...page, ...options });
  page.events.get('analytics-accept:click')();
  page.events.get('analytics-accept:click')();

  const update = page.window.dataLayer.find((entry) => entry[0] === 'consent' && entry[1] === 'update');
  assert.deepEqual([...update], ['consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }]);
  assert.equal(page.storage.get(options.storageKey), 'granted');
  assert.equal(page.appendedScripts.length, 1);
  assert.equal(page.appendedScripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-P95CVSH72Z');
});

test('reject persists the choice and never loads Google Analytics', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture();
  setupAnalyticsConsent({ ...page, ...options });
  page.events.get('analytics-reject:click')();

  assert.equal(page.storage.get(options.storageKey), 'denied');
  assert.equal(page.appendedScripts.length, 0);
  assert.equal(page.elements.get('analytics-consent').hidden, true);
});

test('does nothing outside the exact production hostname', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture('localhost');
  setupAnalyticsConsent({ ...page, ...options });

  assert.equal(page.window.dataLayer, undefined);
  assert.equal(page.appendedScripts.length, 0);
  assert.equal(page.elements.get('analytics-consent').hidden, true);
});

test('footer control reopens analytics choices', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture();
  page.storage.set(options.storageKey, 'denied');
  setupAnalyticsConsent({ ...page, ...options });
  page.events.get('analytics-choices:click')();

  assert.equal(page.elements.get('analytics-consent').hidden, false);
});

test('tracked navigation sends a low-cardinality select_content event after consent', async () => {
  const setupAnalyticsConsent = await loadSetup();
  const page = fixture();
  setupAnalyticsConsent({ ...page, ...options });
  page.events.get('analytics-accept:click')();
  page.events.get('trackable:click')();

  const event = page.window.dataLayer.find((entry) => entry[0] === 'event' && entry[1] === 'select_content');
  assert.deepEqual([...event], ['event', 'select_content', {
    content_type: 'navigation_link',
    item_id: 'classes',
    transport_type: 'beacon',
  }]);
});
