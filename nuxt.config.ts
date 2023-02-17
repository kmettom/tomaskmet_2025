// https://nuxt.com/docs/api/configuration/nuxt-config

import glsl from 'vite-plugin-glsl';
export default defineNuxtConfig({
    build: {
        transpile: ['gsap'],

        // plugins: [glsl()],
    },
    vite: {
        plugins: [glsl()],
    },

    // modules: [
    //     '@pinia/nuxt',
    // ],
})
