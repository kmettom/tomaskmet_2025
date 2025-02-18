import { gsap } from 'gsap';
import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as pkg from 'three-msdf-text-utils/build/bundle';

import Scroll from './scroll.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import scrollFragment from './shaders/scrollFragment.glsl';
import scrollVertex from './shaders/scrollVertex.glsl';

import projectFragment from './shaders/projectFragment.glsl';
import projectVertex from './shaders/projectVertex.glsl';

import MSDFFragment from './shaders/MSDFfragment.glsl';
import MSDFVertex from './shaders/MSDFvertex.glsl';
import { generateBindingLogic } from '~/utils/canvasHelpers';

const { MSDFTextGeometry } = pkg;

const CanvasOptions = {
  fonts: {
    PPFormula: {
      fnt: '/font/PPFormula-CondensedBlack.fnt',
      atlas: '/font/PPFormula-CondensedBlack.png',
    },
  },
  scroll: {
    fragmentShader: scrollFragment,
    vertexShader: scrollVertex,
  },
  default: {
    fragmentShader: projectFragment,
    vertexShader: projectVertex,
    textFragment: MSDFFragment,
    textVertex: MSDFVertex,
  },
  // projectImage: {
  //   fragmentShader: projectFragment,
  //   vertexShader: projectVertex,
  // },
};

const Canvas = {
  navigationStore: null,
  scrollInProgress: false,
  animateImageMesh: false,
  canvasContainer: null,
  scrollableContent: null,
  pointer: { cursor: null, intersects: null },
  time: 0,
  scene: new THREE.Scene(),
  materials: [],
  imageStore: [],
  textStore: [],
  trackViewPortElements: [],
  scroll: null,
  currentScroll: 0,
  options: CanvasOptions,
  animations: {
    welcome: {},
    cursorCallback: () => {},
  },
  mouse: { x: 0, y: 0, movementX: 0, movementY: 0 },
  triggerSectionPositions: {},
  initScroll() {
    this.scroll = new Scroll({
      dom: this.scrollableContent,
      // activeCallback: this.activateMesh,
    });
  },
  setCanvasAndCamera() {
    this.width = this.canvasContainer.offsetWidth;
    this.height = this.canvasContainer.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000,
    );
    this.camera.position.z = 600; // 600
    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.canvasContainer.appendChild(this.renderer.domElement);
  },
  init(canvasElement, scrollableContent) {
    this.canvasContainer = canvasElement;
    this.scrollableContent = scrollableContent;

    this.initScroll();

    this.setCanvasAndCamera();

    this.setSize();
    this.composerPass();

    this.setResizeListener();

    this.render();

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX / this.width;
      this.mouse.y = event.clientY / this.height;
      this.mouse.movementX = Math.abs(event.movementX);
      this.mouse.movementY = Math.abs(event.movementY);
    });
  },
  setResizeListener() {
    window.addEventListener('resize', () => {
      this.width = this.canvasContainer.offsetWidth;
      this.height = this.canvasContainer.offsetHeight;

      this.setSize();

      this.resizeImageStore();
      this.resizeTextStore();
    });
  },
  resizeImageStore() {
    for (var i = 0; i < this.imageStore.length; i++) {
      let bounds = this.imageStore[i].htmlEl.getBoundingClientRect();
      this.imageStore[i].mesh.scale.set(bounds.width, bounds.height);
      this.imageStore[i].mesh.material.uniforms.uMeshSize.value.set(width, height);
      this.imageStore[i].width = bounds.width;
      this.imageStore[i].height = bounds.height;
    }
    this.setImageMeshPositions();
  },
  resizeTextStore() {
    for (var i = 0; i < this.textStore.length; i++) {
      let bounds = this.textStore[i].htmlEl.getBoundingClientRect();
      this.textStore[i].mesh.scale.set(bounds.width, bounds.height);
      this.textStore[i].width = bounds.width;
      this.textStore[i].height = bounds.height;
    }
    this.setTextMeshPositions();
  },
  setImageMeshPositions() {
    if (this.imageStore.length === 0) return;
    for (var i = 0; i < this.imageStore.length; i++) {
      this.imageStore[i].mesh.position.x =
        this.imageStore[i].htmlEl.getBoundingClientRect().left -
        this.width / 2 +
        this.imageStore[i].width / 2;
      this.imageStore[i].mesh.position.y =
        -this.imageStore[i].htmlEl.getBoundingClientRect().top +
        this.height / 2 -
        this.imageStore[i].height / 2;
    }
  },
  setTextMeshPositions() {
    if (this.textStore.length === 0) return;
    for (var i = 0; i < this.textStore.length; i++) {
      this.textStore[i].mesh.position.x =
        this.textStore[i].htmlEl.getBoundingClientRect().left - this.width / 2;
      this.textStore[i].mesh.position.y =
        -this.textStore[i].htmlEl.getBoundingClientRect().top +
        this.height / 2 -
        this.textStore[i].height / 2;
    }
  },

  hoverMesh(id, isHovered) {
    const mesh = this.scene.getObjectByName(id);
    if (!mesh) return;
    gsap.to(mesh.material.uniforms.hoverState, {
      duration: 0.5,
      value: isHovered ? 1 : 0,
    });
  },

  activateMesh(id, isActive) {
    const mesh = this.scene.getObjectByName(id);
    gsap.to(mesh.material.uniforms.aniIn, {
      duration: 1.25, //1.25
      value: isActive ? 1 : 0,
    });
  },

  onActiveElCallback(item, isActive) {
    if (item.options.activateCallback && isActive) {
      item.options.activateCallback(isActive, item);
    }
    //TODO: finish scrollTriggerSectionsClass logic
    // if (item.options.scrollTriggerSectionsClass) {
    // this.scroll.scrollOnTrigger = active;
    // if (!active) {
    // this.navigationStore.setProjectsExpanded(false);
    // }
    // }
  },

  onScrollCallback() {
    // console.log('onScrollCallback');
  },

  sectionTriggerMove() {
    console.log('sectionTriggerMove');
  },

  addOnTriggerSectionSlide(binding) {
    console.log('addOnTriggerSectionSlide', binding);
  },

  createTriggerSectionPositions(binding) {
    binding.options.scrollTriggerSections = document.querySelectorAll(
      binding.options.scrollTriggerSectionsClass,
    );
    this.triggerSectionPositions[binding.options.scrollTriggerSectionsClass] =
      [];
  },

  addOnScrollActivateElement(binding) {
    const newBinding = generateBindingLogic(binding);
    if (newBinding.options.scrollTriggerSectionsClass) {
      this.createTriggerSectionPositions();
      // TODO: create trigger section logic
      //if this section active, block scroll and use it as a trigger to move to next section
    }

    this.scroll.DOM.onScrollActivateElements.push(newBinding);
    // this.onActiveElCallback(newBinding, false);
  },

  updateOnScrollActiveElement(updatedBinding) {
    for (let [
      index,
      item,
    ] of this.scroll.DOM.onScrollActivateElements.entries()) {
      if (
        item.elNode.dataset.scrollActivateId ===
        updatedBinding.elNode.dataset.scrollActivateId
      ) {
        this.scroll.DOM.onScrollActivateElements[index] =
          generateBindingLogic(updatedBinding);
      }
    }
  },

  removeScrollActiveElement(elNode) {
    if (!elNode || this.scroll.DOM.onScrollActivateElements.length === 0)
      return;
    for (var i = 0; i < this.scroll.DOM.onScrollActivateElements.length; i++) {
      if (
        this.scroll.DOM.onScrollActivateElements[i].elNode.isEqualNode(elNode)
      ) {
        this.scroll.DOM.onScrollActivateElements.splice(i, 1);
        break;
      }
    }
  },

  removeMesh(id) {
    let toRemove = this.scene.getObjectByName(id);
    if (!toRemove) return;
    this.scene.remove(toRemove);
    toRemove.geometry.dispose();
    toRemove.material.dispose();
    toRemove = undefined;

    for (var i = 0; i < this.imageStore.length; i++) {
      if (this.imageStore[i].name === id) {
        this.imageStore.splice(i, 1);
        this.materials.splice(i, 1);
        break;
      }
    }
  },

  addTextAsMSDF(shader, meshId, htmlEl, text, theme, mouseListeners) {
    let vertexShader = this.options.default.textVertex;
    let fragmentShader = this.options.default.textFragment;

    if (shader) {
      vertexShader = this.options[shader].vertexShader;
      fragmentShader = this.options[shader].fragmentShader;
    }

    let bounds = htmlEl.getBoundingClientRect();
    let position = { top: bounds.top, left: bounds.left };
    position.top += this.currentScroll;

    //*****************************
    // MSDF
    //*****************************

    const loadFontAtlas = (path) => {
      return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load(path, resolve);
      });
    };

    const loadFont = (path) => {
      return new Promise((resolve) => {
        const loader = new FontLoader();
        loader.load(path, resolve);
      });
    };

    Promise.all([
      loadFontAtlas(CanvasOptions.fonts.PPFormula.atlas),
      loadFont(CanvasOptions.fonts.PPFormula.fnt),
    ]).then(([atlas, font]) => {
      const geometry = new MSDFTextGeometry({
        text: text.trim(),
        font: font.data,
      });

      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
          IS_SMALL: false, //false,
        },
        extensions: {
          derivatives: false, //true,
        },
        uniforms: {
          devicePixelRatio: { value: window.devicePixelRatio },
          uColor: {
            value: new THREE.Color(theme === 'dark' ? '#1B1818' : '#BFC0B2'),
          },
          viewport: {
            type: 'v2',
            value: new THREE.Vector2(this.width, this.height),
          },
          // Common
          uMouse: { value: new THREE.Vector2(0, 0) },
          uMouseMovement: { value: new THREE.Vector2(0, 0) },
          uOpacity: { value: 1 },
          uMap: { value: null },
          // Rendering
          uThreshold: { value: 0.05 },
          uAlphaTest: { value: 0.01 },
          // Strokes
          // uStrokeColor: { value: new THREE.Color("#ff0000") },
          uStrokeOutsetWidth: { value: 0.0 },
          uStrokeInsetWidth: { value: 0.3 }, //0.3
          // new generic
          time: { value: 0 },
          // uImage: {value: texture},
          vectorVNoise: { value: new THREE.Vector2(1.5, 1.5) }, // 1.5
          hoverState: { value: 0 },
          aniIn: { value: 0 },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      material.uniforms.uMap.value = atlas;

      this.materials.push(material);

      let mesh = new THREE.Mesh(geometry, material);
      mesh.name = meshId;
      htmlEl.dataset.meshId = meshId;

      const widthPositionCoef = 1;
      const heightPositionCoef = 1.38;
      const heightSizeCoef = 1;

      const scaleX =
        (bounds.width / mesh.geometry._layout._width) * heightSizeCoef;
      // const scaleY = - 1 * bounds.height / mesh.geometry._layout._height;
      const scaleY = -1 * scaleX * heightSizeCoef;

      mesh.scale.set(scaleX, scaleY, 1);

      this.scene.add(mesh);

      const newMesh = {
        name: meshId,
        htmlEl: htmlEl,
        mesh: mesh,
        top: position.top,
        left: position.left,
        width: bounds.width * widthPositionCoef,
        height: bounds.height * heightPositionCoef,
      };

      this.textStore.push(newMesh);

      this.setTextMeshPositions();

      // setTimeout(() => {
      // if (!htmlEl.dataset.scrollActive) this.activateMesh(meshId, true, 'ADDMSDF');
      // }, 250);
      if (mouseListeners) this.meshMouseListeners(newMesh, material);
    });
  },
  addImageAsMesh(htmlEl, shader, meshId, mouseListeners) {
    let vertexShader = this.options.default.vertexShader;
    let fragmentShader = this.options.default.fragmentShader;

    if (shader) {
      vertexShader = this.options[shader].vertexShader;
      fragmentShader = this.options[shader].fragmentShader;
    }

    let geometry;
    let bounds = htmlEl.getBoundingClientRect();
    let position = { top: bounds.top, left: bounds.left };
    position.top += this.currentScroll;

    geometry = new THREE.PlaneGeometry(1, 1);

    let id = meshId
      ? meshId
      : `meshImage_${shader || 'default'}_${this.imageStore.length}`;
    htmlEl.dataset.meshId = id;

    let texture = new THREE.TextureLoader().load(htmlEl.src, () => {
      //TODO: xxxyyy
      material.uniforms.uTextureSize.value.set(texture.image.width, texture.image.height);
    });
    texture.needsUpdate = true;

    let material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: texture },
        vectorVNoise: { value: new THREE.Vector2(1.5, 1.5) }, // 1.5
        hoverState: { value: 0 },
        aniIn: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseMovement: { value: new THREE.Vector2(0, 0) },
        uMeshSize: { value: new THREE.Vector2(bounds.width, bounds.height) },
        uTextureSize: { value: new THREE.Vector2(500, 500) },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      transparent: true,
      name: id,
    });

    this.materials.push(material);

    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = id;

    mesh.scale.set(bounds.width, bounds.height);

    this.scene.add(mesh);

    const newMesh = {
      name: id,
      htmlEl: htmlEl,
      mesh: mesh,
      top: position.top,
      left: position.left,
      width: bounds.width,
      height: bounds.height,
      thumbOutAction: { value: 0 },
    };

    this.imageStore.push(newMesh);

    setTimeout(() => {
      if (!htmlEl.dataset.scrollActive) this.activateMesh(id, true);
    }, 250);

    this.setImageMeshPositions();
    if (mouseListeners) this.meshMouseListeners(newMesh, material);
  },

  meshMouseListeners(mesh, material) {
    mesh.htmlEl.addEventListener('mouseenter', () => {
      mesh.mesh.renderOrder = 1;
      gsap.to(material.uniforms.hoverState, {
        duration: 0.5,
        value: 1,
      });
    });

    mesh.htmlEl.addEventListener('mouseout', () => {
      mesh.mesh.renderOrder = 0;
      gsap.to(material.uniforms.hoverState, {
        duration: 0.5,
        value: 0,
      });
    });
  },
  composerPass() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: null },
      },
      vertexShader: this.options.scroll.vertexShader,
      fragmentShader: this.options.scroll.fragmentShader,
    };

    this.customPass = new ShaderPass(this.myEffect);
    this.customPass.renderToScreen = true;

    this.composer.addPass(this.customPass);
  },
  setSize() {
    this.width = this.canvasContainer.offsetWidth;
    this.height = this.canvasContainer.offsetHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera); // -> Also needed
  },
  scrollToTop(delay) {
    setTimeout(() => {
      this.scroll.render(0, false);
    }, delay);
  },

  scrollTo(position, delay) {
    setTimeout(() => {
      this.scroll.render(position, true);
    }, delay);
  },

  scrollToElBySelector(elQuerySelector, delay) {
    const element = document.querySelector(elQuerySelector);
    if (!element) return;
    const position = element.offsetTop;
    setTimeout(() => {
      this.scroll.render(position, true);
    }, delay);
  },

  render() {
    this.animations.cursorCallback();
    this.time += 0.05;

    this.scroll.render();
    this.scrollInProgress = this.currentScroll !== this.scroll.scrollToRender;
    this.currentScroll = this.scroll.scrollToRender;

    //animate on scroll
    if (this.scrollInProgress) {
      this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;
      this.setImageMeshPositions();
      this.setTextMeshPositions();
    }

    if (this.animateImageMesh) {
      this.resizeImageStore();
    }

    //animate on hover
    for (var i = 0; i < this.materials.length; i++) {
      this.materials[i].uniforms.time.value = this.time;
      this.materials[i].uniforms.uMouse.value = new THREE.Vector2(
        this.mouse.x,
        this.mouse.y,
      );
      this.materials[i].uniforms.uMouseMovement.value = new THREE.Vector2(
        this.mouse.movementX,
        this.mouse.movementY,
      );
    }

    this.composer.render();

    try {
      requestAnimationFrame(this.render.bind(this));
    } catch (e) {
      console.error(e);
      setImmediate(this.render.bind(this));
    }
  },
};

export { Canvas };
