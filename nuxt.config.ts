// https://nuxt.com/docs/api/configuration/nuxt-config

import glsl from 'vite-plugin-glsl';
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {},

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    ['@nuxt-modules/compression', { algorithm: 'brotliCompress' }],
    '@nuxt/image',
    'nuxt-viewport',
    '@pinia/nuxt',
  ],

  image: {
    provider: 'ipx',
    dir: 'public/',
  },

  build: {
    transpile: ['gsap'],
  },

  vite: {
    plugins: [glsl()],
    css: {
      preprocessorOptions: {
        scss: {
          extractCSS: false,
        },
      },
    },
  },

  hooks: {
    'build:manifest': (manifest) => {
      // find the app entry, css list
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css;
      if (css) {
        // start from the end of the array and go to the beginning
        for (let i = css.length - 1; i >= 0; i--) {
          // if it starts with 'entry', remove it from the list
          if (css[i].startsWith('entry')) css.splice(i, 1);
        }
      }
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  compatibilityDate: '2025-01-08',
});
