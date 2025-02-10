import { Canvas } from '~/utils/canvas.js';

// const generateBindingObject = (binding) => {
//   let bindingObject = {...binding};
//   if (bindingObject.options.fixToParentId) {
//     // setTimeout(() => {
//       // timeout for rendering when page is changed
//       bindingObject.containerId = bindingObject.options.fixToParentId;
//       bindingObject.options.scrollSpeed = 1;
//       bindingObject.bounds = bindingObject.elNode.getBoundingClientRect();
//       bindingObject.containerEl = document.getElementById(bindingObject.containerId);
//       bindingObject.childEl = bindingObject.elNode.children[0];
//       bindingObject.containerBottom =
//           bindingObject.containerEl.getBoundingClientRect().bottom;
//       bindingObject.margin = 0;
//       // this.scroll.DOM.onScrollActivateElements.push(bindingObject);
//     // }, 750);
//     // return;
//   }
//   return bindingObject
// };

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onScrollActivate', {
    mounted(el, binding) {
      setTimeout(() => {
        const bindingObject = generateBindingObject(binding);
        Canvas.addOnScrollActivateElement({
          elNode: el,
          options: binding.value,
          arg: binding.arg,
        });
      }, 150);
    },
    updated(el, binding) {
      Canvas.updateOnScrollActiveElement({
        elNode: el,
        options: binding.value,
        arg: binding.arg,
      });
    },
    unmounted(el) {
      Canvas.removeScrollActiveElement(el);
    },
  });
});

// const onScrollActivateOptions = {
//   activeRange: Number,
//   activateOnce: Boolean,
//   activateCallback: String,
//   trackOnly: Boolean,
//   bidirectionalActivation: Boolean (default: false),
//   activeRangeOrigin: 'top' | 'middle' (Default)
//   activeRangeMargin: Number
//   scrollSpeed: Number,
//   fixToParentId: Boolean,
//   scrollCallback: string
// }
