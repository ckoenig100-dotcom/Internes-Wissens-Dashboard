// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  base: '/wissens-dashboard',

  // Astro's Origin-Header-Check für multipart/form-data-Requests (z.B. den
  // Dokument-Upload) erkennt Anfragen hinter unserem nginx-Reverse-Proxy
  // fälschlich als cross-site, da der Node-Prozess selbst nur auf
  // 127.0.0.1:4323 lauscht. Alle mutierenden Admin-Routen sind bereits über
  // HTTP Basic Auth + ein geteiltes Secret zu n8n abgesichert.
  security: {
    checkOrigin: false
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  })
});