const addDataSetToEl = (_attrs, _el) => {
  if (_el.nodeName == '#text') return;

  for (let key in _attrs) {
    if (_attrs.hasOwnProperty(key) && _el.setAttribute) {
      _el.setAttribute('data-' + key, _attrs[key]);
    }
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('setDataAttrs', {
    mounted: function (el, binding, _) {
      addDataSetToEl(binding.value, el);

      if (el.childNodes) {
        let setChildNodes = (_el) => {
          for (var i = 0; i < _el.childNodes.length; i++) {
            addDataSetToEl(binding.value, _el.childNodes[i]);
            if (
              _el.childNodes[i].childNodes &&
              _el.childNodes[i].childNodes.length > 0
            ) {
              setChildNodes(_el.childNodes[i]);
            }
          }
        };
        setChildNodes(el);
      }
    },
  });
});
