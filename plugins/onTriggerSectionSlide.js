import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onTriggerSectionSlide', {
    mounted(el, binding) {
      setTimeout(() => {
        Canvas.addOnTriggerSectionSlide({
          elNode: el,
          options: binding.value,
          arg: binding.arg,
        });
      }, 150);
    },
    updated(el, binding) {
      // console.log(el, binding);
      // Canvas.updateOnTriggerSectionSlide({
      //   elNode: el,
      //   options: binding.value,
      //   arg: binding.arg,
      // });
    },
    unmounted(el) {
      // console.log(el);
      // Canvas.removeOnTriggerSectionSlide(el);
    },
  });
});

// const onScrollActivateOptions = {
// TODO:
// orientation: 'horizontal' | 'vertical'
// scrollTriggerSectionsClass: string | null
// }
