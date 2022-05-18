export default {
  swDest: 'build/sw.js',
  globPatterns: [
    '**/*.{html,woff2,png,svg,jpg,js,json}'
  ],
  globDirectory: 'build/',
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('^(.*)\.(png|jpg|svg)$'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'Images',
      },
    },
    {
      urlPattern: new RegExp('^/words/(.*).json$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'Words Game',
      },
    },
    {
      urlPattern: new RegExp('^/l10n/(.*).json$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'localization',
      },
    },
  ],
};
