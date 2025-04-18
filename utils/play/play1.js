import * as THREE from "three";
import {loadTexture} from "~/utils/canvasHelpers";
import {Canvas} from "~/utils/canvas";

export async function addObjectPlay1(
    imgHtmlEl, // elNode
    shader,
    mouseListeners,
    meshUniforms,
) {

    const meshId = "play1Id";

    let vertexShader = Canvas.options.default.vertexShader;
    let fragmentShader = Canvas.options.default.fragmentShader;

    if (shader) {
        vertexShader = Canvas.options[shader].vertexShader;
        fragmentShader = Canvas.options[shader].fragmentShader;
    }

    let bounds = imgHtmlEl.getBoundingClientRect();
    let position = { top: bounds.top, left: bounds.left };
    position.top += Canvas.currentScroll;

    let geometry = new THREE.PlaneGeometry(1, 1);

    const texture = await loadTexture(imgHtmlEl.src);
    texture.needsUpdate = true;

    let material = new THREE.ShaderMaterial({
        uniforms: {
            uDevicePixelRatio: { value: window.devicePixelRatio },
            uTime: { value: 0 },
            uImage: { value: texture },
            vectorVNoise: { value: new THREE.Vector2(1.5, 1.5) }, // 1.5
            uAniInImage: { value: meshUniforms.uAniInImage?.value ?? 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uMouseMovement: { value: new THREE.Vector2(0, 0) },
            uMeshSize: { value: new THREE.Vector2(bounds.width, bounds.height) },
            uTextureSize: {
                value: new THREE.Vector2(
                    texture.image.naturalWidth,
                    texture.image.naturalHeight,
                ),
            },
            uViewport: {
                type: 'v2',
                value: new THREE.Vector2(Canvas.width, Canvas.height),
            },
            ...meshUniforms,
        },
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
        transparent: true,
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
    if (mouseListeners) Canvas.meshMouseListeners(newMesh, material);
}