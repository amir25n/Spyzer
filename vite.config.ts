import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
// import {viteStaticCopy} from 'vite-plugin-static-copy';

import type {ManifestOptions} from 'vite-plugin-pwa';
import type {GenerateSWOptions} from 'workbox-build';

const DIST_PATH = 'build/';
const serviceWorker: Partial<GenerateSWOptions> = {
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  inlineWorkboxRuntime: true,
  swDest: `${DIST_PATH}sw.js`,
  globDirectory: DIST_PATH,
  globPatterns: ['**/*.{html,js,css,woff,png,ico,svg}'],
};
const manifestJson: Partial<ManifestOptions> = {
  /* i18n */
  dir: 'ltr',
  lang: 'en-US',

  /* url */
  scope: '/',
  start_url: '/?pwa',

  /* info */
  name: 'Spyzer',
  short_name: 'Spyzer',
  description: 'Spy Hunter Game PWA',

  /* screen */
  display: 'standalone',
  orientation: 'portrait',

  /* theming */
  theme_color: '#009688',
  background_color: '#f4511e',

  /* icons */
  icons: [
    {
      src: 'images/icon-192-maskable.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable',
    },
    {
      src: 'images/icon-512-maskable.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'maskable',
    },
    {src: 'images/icon-192.png', type: 'image/png', sizes: '192x192'},
    {src: 'images/icon-512.png', type: 'image/png', sizes: '512x512'},
  ],
};

export default defineConfig({
  server: {
    hmr: true,
    open: true,
    host: '0.0.0.0',
    port: 9090,
  },
  build: {
    outDir: DIST_PATH,
    reportCompressedSize: true,
  },
  plugins: [
    vitePWA({
      strategies: 'generateSW',
      workbox: serviceWorker,
      devOptions: {
        enabled: false,
      },
      registerType: 'autoUpdate',
      manifest: manifestJson,
    }),
  ],
});
