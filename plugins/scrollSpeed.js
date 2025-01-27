import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scrollSpeed', {
    mounted(el, binding) {
      setTimeout(() => {
        Canvas.addScrollSpeedElement({
          elNode: el,
          options: binding.value,
          arg: binding.arg,
        });
      }, 150);
    },
    unmounted(el) {
      Canvas.removeScrollSpeedElement(el);
    },
  });
});
