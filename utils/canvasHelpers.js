export function generateBindingLogic(binding) {
  binding.elNode.dataset.activeScroll = 'false';
  if (!binding.options.trackOnly) {
    binding.containedMeshIds = findMeshIDs(binding.elNode, true);
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

export function findMeshIDs(elParent, isActiveScroll) {
  let meshIds = [];

  if (elParent.dataset.meshId) {
    elParent.dataset.scrollActive = 'true';
    meshIds.push(elParent.dataset.meshId);
    return meshIds;
  }

  let el = elParent.querySelectorAll('[data-mesh-id]');
  if (!el && el.length === 0) return false;
  for (const elKey in el) {
    elKey.dataset.scrollActive = isActiveScroll ? 'true' : undefined;
    meshIds.push(elKey.dataset.meshId);
  }
  return meshIds;
}
