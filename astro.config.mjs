import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), solid()],
  build: {
    inlineStylesheets: 'auto',
  },
  site: 'https://pom-pom.pro',
  compressHTML: true,

});
