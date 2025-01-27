import { Canvas } from '~/utils/canvas.js';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onScrollActivate', {
    mounted(el, binding) {
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

// const onScrollActivateOptions = {
//   activeRange: Number,
//   activateFromTop: Boolean,
//   activateOnce: Boolean,
//   activateCallback: String,

//TODO:
//  trackOnly: Boolean,
//  activationArea: 'top' | 'middle' (Default)

// TODO:
//   scrollSpeed: Number,
//   fixToParentId: Boolean,
//   scrollCallback: string

// }
