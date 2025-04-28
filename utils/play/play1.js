import * as THREE from 'three';
import { loadTexture } from '~/utils/canvasHelpers';
import { Canvas } from '~/utils/canvas';
// import { vec3 } from 'three/tsl';

export async function addObjectPlay1(
  imgHtmlEl, // elNode html element
  meshUniforms,
) {
  console.log('addObjectPlay1', imgHtmlEl);
  const meshId = 'play1Id';

  let vertexShader = Canvas.options.play1.vertexShader;
  let fragmentShader = Canvas.options.play1.fragmentShader;

  let bounds = imgHtmlEl.getBoundingClientRect();
  let position = { top: bounds.top, left: bounds.left };
  position.top += Canvas.currentScroll;

  let geometry = new THREE.SphereGeometry(1, 32, 32);
  // let geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

  const texture = await loadTexture('http://localhost:4200/images/neo.webp');
  texture.needsUpdate = true;

  // console.log("texture", texture);

  let material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      // uDevicePixelRatio: {value: window.devicePixelRatio},
      uTime: { value: 0 },
      uImage: { value: texture },
      // vectorVNoise: {value: new THREE.Vector2(1.5, 1.5)}, // 1.5
      // uAniInImage: {value: meshUniforms.uAniInImage?.value ?? 0},
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseMovement: { value: new THREE.Vector2(0, 0) },
      // uMeshSize: {value: new THREE.Vector2(bounds.width, bounds.height)},
      // uTextureSize: {
      //     value: new THREE.Vector2(
      //         texture.image.naturalWidth,
      //         texture.image.naturalHeight,
      //     ),
      // },
      // uViewport: {
      //     type: 'v2',
      //     value: new THREE.Vector2(Canvas.width, Canvas.height),
      // },
      ...meshUniforms,
    },
    wireframe: true,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    // transparent: false,
    name: meshId,
  });

  Canvas.materials.push(material);

  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = meshId;

  mesh.scale.set(bounds.width, bounds.height);

  Canvas.scene.add(mesh);

  const newMesh = {
    name: meshId,
    htmlEl: imgHtmlEl,
    mesh: mesh,
    top: position.top,
    left: position.left,
    width: bounds.width,
    height: bounds.height,
    thumbOutAction: { value: 0 },
  };

  Canvas.imageStore.push(newMesh);

  if (meshUniforms.uAniInImage || imgHtmlEl.dataset.activeScroll === 'true') {
    Canvas.activateMesh(meshId, true);
  }

  Canvas.setImageMeshPositions();
  // Canvas.meshMouseListeners(newMesh, material);
}
