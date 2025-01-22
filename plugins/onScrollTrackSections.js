import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('trackSection', {
    mounted(el, binding) {
      setTimeout(() => {
        Canvas.addOnScrollTrackSection({
          elNode: el,
          options: binding.arg,
        });
      }, 150);
    },
    unmounted(el) {
      Canvas.removeScrollActiveElement(el);
    },
  });
});
