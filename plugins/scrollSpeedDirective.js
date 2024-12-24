import {Canvas} from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {

    nuxtApp.vueApp.directive('scrollSpeed', {
        mounted (el, binding) {
            setTimeout(() => {
                Canvas.addScrollSpeedElement({elNode: el , scrollSpeed: binding.value, options: binding.arg })
            },150)
        },
        unmounted (el, binding) {
            Canvas.removeScrollSpeedElement(el)
        }
    });

})

