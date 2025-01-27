import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onScrollActivate', {
    mounted(el, binding) {
      console.log('binding', binding);
      setTimeout(() => {
        Canvas.addOnScrollActivateElement({
          elNode: el,
          options: binding.value,
          arg: binding.arg,
        });
      }, 150);
    },
    unmounted(el) {
      Canvas.removeScrollActiveElement(el);
    },
  });
});
