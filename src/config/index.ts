import { features } from './features.config.ts';
import { navigation } from './navigation.config.ts';
import { routes } from './routes.config.ts';
import { siteConfig } from './site.config.ts';
import { sources } from './sources.config.ts';
import type { ConfigBundle } from './schema.ts';

export const configBundle: ConfigBundle = {
  site: siteConfig,
  routes,
  navigation,
  sources,
  features,
};

export { features, navigation, routes, siteConfig, sources };
export type * from './schema.ts';
