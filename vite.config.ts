import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import {viteStaticCopy} from 'vite-plugin-static-copy';

import type {ManifestOptions} from 'vite-plugin-pwa';
import type {GenerateSWOptions} from 'workbox-build';

const DIST_PATH = 'build/';
const serviceWorker: Partial<GenerateSWOptions> = {
  skipWaiting: true,
  clientsClaim: true,
  inlineWorkboxRuntime: true,
  swDest: `${DIST_PATH}sw.js`,
  globDirectory: DIST_PATH,
  globPatterns: ['**/*.{html,js,css,woff,png,ico}'],
};
const manifestJson: Partial<ManifestOptions> = {
  dir: 'rtl',
  scope: '/',
  lang: 'fa-IR',
  start_url: '/',
  short_name: 'Spy',
  name: 'Spy Hunters',
  display: 'standalone',
  theme_color: '#009688',
  orientation: 'portrait',
  background_color: '#f4511e',
  icons: [
    {src: 'images/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32'},
    {src: 'images/icon-192.png', type: 'image/png', sizes: '192x192'},
    {src: 'images/icon-512.png', type: 'image/png', sizes: '512x512'},
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
        enabled: true,
      },
      manifest: manifestJson,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'images',
          dest: '.',
        },
      ],
    }),
  ],
});
