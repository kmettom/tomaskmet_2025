import * as THREE from 'three';

export function generateBindingLogic(newBinding) {
  let binding = newBinding;
  binding.elNode.dataset.activeScroll =
    newBinding?.elNode?.dataset?.activeScroll ?? 'false';
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

export function loadTexture(src) {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (texture) => resolve(texture), // On success
      undefined, // On progress (optional)
      (err) => reject(err), // On error
    );
  });
}
const heightSizeCoef = 1;
export const heightPositionCoef = 1.38;

export function getMSDFFontMeshScales(boundsWidth, geometryWidth) {
  const scaleX = (boundsWidth / geometryWidth) * heightSizeCoef;
  const scaleY = -1 * scaleX * heightSizeCoef;

  return { scaleX, scaleY };
}
