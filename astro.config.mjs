import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.config.ts';

export default defineConfig({
  site: siteConfig.origin,
  trailingSlash: 'always',
});
