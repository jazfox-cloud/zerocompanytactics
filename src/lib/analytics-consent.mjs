export function setupAnalyticsConsent({ window, document, measurementId, productionHost, storageKey }) {
  if (window.location.hostname !== productionHost) return;

  const panel = document.getElementById('analytics-consent');
  const accept = document.getElementById('analytics-accept');
  const reject = document.getElementById('analytics-reject');
  const choices = document.getElementById('analytics-choices');
  if (!panel || !accept || !reject) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });

  let loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  function grantAnalytics() {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.localStorage.setItem(storageKey, 'granted');
    panel.hidden = true;
    loadAnalytics();
  }

  function denyAnalytics() {
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.localStorage.setItem(storageKey, 'denied');
    panel.hidden = true;
  }

  accept.addEventListener('click', grantAnalytics);
  reject.addEventListener('click', denyAnalytics);
  choices?.addEventListener('click', () => { panel.hidden = false; });

  for (const link of document.querySelectorAll('[data-analytics-item]')) {
    link.addEventListener('click', () => {
      if (window.localStorage.getItem(storageKey) !== 'granted') return;
      gtag('event', 'select_content', {
        content_type: 'navigation_link',
        item_id: link.dataset.analyticsItem,
        transport_type: 'beacon',
      });
    });
  }

  const storedChoice = window.localStorage.getItem(storageKey);
  if (storedChoice === 'granted') grantAnalytics();
  else if (storedChoice !== 'denied') panel.hidden = false;
}
