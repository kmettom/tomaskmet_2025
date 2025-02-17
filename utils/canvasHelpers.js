import { log } from 'three/tsl';

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

  let elementsWithMesh = elParent.querySelectorAll('[data-mesh-id]');
  if (!elementsWithMesh || elementsWithMesh.length === 0) return false;
  for (const el of elementsWithMesh) {
    el.dataset.scrollActive = isActiveScroll ? 'true' : undefined;
    meshIds.push(el.dataset.meshId);
  }
  return meshIds;
}
