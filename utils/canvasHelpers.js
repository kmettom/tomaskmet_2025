export function generateBindingLogic(binding) {
  binding.elNode.dataset.activeScroll = 'false';
  if (!binding.options.trackOnly) {
    binding.containedMeshId = findMeshID(binding.elNode, true);
    binding.elNode.classList.add('show-on-scroll');
  }

  if (binding.options.fixToParentId) {
    binding.containerId = binding.options.fixToParentId;
    binding.options.scrollSpeed = 1;
    binding.bounds = binding.elNode.getBoundingClientRect();
    binding.containerEl = document.getElementById(binding.containerId);
    binding.childEl = binding.elNode.children[0];
    binding.containerBottom =
      binding.containerEl.getBoundingClientRect().bottom;
    binding.margin = 0;
  }
  return binding;
}

export function findMeshID(elParent, isActiveScroll) {
  if (elParent.dataset.meshId) {
    elParent.dataset.scrollActive = 'true';
    return elParent.dataset.meshId;
  }

  let el = elParent.querySelector('[data-mesh-id]');
  if (!el) return false;

  el.dataset.scrollActive = isActiveScroll ? 'true' : undefined;
  return el.dataset.meshId;
}
