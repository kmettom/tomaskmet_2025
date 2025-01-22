import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('trackSection', {
    mounted(el, binding) {
      setTimeout(() => {
        console.log('binding', binding);
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
