import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scrollActive', {
    mounted(el, binding, _) {
      setTimeout(() => {
        Canvas.addScrollActiveElement({
          elNode: el,
          scrollActive: binding.value,
          options: binding.arg,
        });
      }, 150);
    },
    unmounted(el) {
      Canvas.removeScrollActiveElement(el);
    },
  });
});
