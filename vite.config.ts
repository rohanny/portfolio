import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: ['**/public/audio/**', '**/backup/**']
    },
    proxy: {
      '/proxy/steam': {
        target: 'https://api.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/steam/, ''),
      },
      '/proxy/letterboxd': {
        target: 'https://letterboxd.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/letterboxd/, ''),
      },
    },
  },
});
