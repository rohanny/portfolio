import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    define: {
      'import.meta.env.VITE_LASTFM_API_KEY': JSON.stringify(process.env.VITE_LASTFM_API_KEY),
      'import.meta.env.VITE_LASTFM_USERNAME': JSON.stringify(process.env.VITE_LASTFM_USERNAME),
    },
  },
}); 