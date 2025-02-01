import { gsap } from 'gsap';
import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { MSDFTextGeometry } from 'three-msdf-text-utils';
import Scroll from './scroll.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import scrollFragment from './shaders/scrollFragment.glsl';
import scrollVertex from './shaders/scrollVertex.glsl';

import defaultFragment from './shaders/defaultFragment.glsl';
import defaultVertex from './shaders/defaultVertex.glsl';

import textFragment from './shaders/textFragment.glsl';
import textVertex from './shaders/textVertex.glsl';

import example1Fragment from './shaders/example1Fragment.glsl';
import example1Vertex from './shaders/example1Vertex.glsl';

import example2Fragment from './shaders/example2Fragment.glsl';
import example2Vertex from './shaders/example2Vertex.glsl';
// import MSDFfragment from './shaders/MSDFfragment.glsl';
import MSDFfragmentBlur from './shaders/MSDFfragmentBlur.glsl';
import MSDFvertex from './shaders/MSDFvertex.glsl';
// import { useNavigationStore } from '~/stores/navigation';

const CanvasOptions = {
  scroll: {
    fragmentShader: scrollFragment,
    vertexShader: scrollVertex,
  },
  default: {
    fragmentShader: defaultFragment,
    vertexShader: defaultVertex,
    textShader: textFragment,
    textVertex: textVertex,
  },
  example1: {
    fragmentShader: example1Fragment,
    vertexShader: example1Vertex,
  },
  example2: {
    fragmentShader: example2Fragment,
    vertexShader: example2Vertex,
  },
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
  initScroll() {
    this.scroll = new Scroll({
      dom: this.scrollableContent,
      activeCallback: this.activateMesh,
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

  hoverMesh(id, state) {
    const mesh = this.scene.getObjectByName(id);
    if (!mesh) return;
    gsap.to(mesh.material.uniforms.hoverState, {
      duration: 0.5,
      value: state ? 1 : 0,
    });
  },

  activateMesh(id, state) {
    const mesh = this.scene.getObjectByName(id);
    gsap.to(mesh.material.uniforms.aniIn, {
      duration: 1.25,
      value: state ? 1 : 0,
    });
  },

  onActiveElCallback(item, active) {
    if (item.options.activateCallback === 'exampleCallback') {
      // do something when _active is true or false
      // console.log('Example callback triggered, element active state: ', active);
    }
    if (item.options.activateCallback === 'pageSection' && active) {
      if (!this.navigationStore) this.navigationStore = useNavigationStore();
      this.navigationStore.setActiveNavItem(item.elNode.dataset.navId);
      this.navigationStore.setNavContrast(!!item.elNode.dataset.navcontrast);
    }
    if (item.options.activateCallback === 'textAnimation' && active) {
      gsap.to(item.elNode, { opacity: 0.5, duration: 2 });
    }
  },

  onScrollCallback() {
    // console.log('onScrollCallback');
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

  updateOnScrollActiveElement(updatedBinding) {
    const itemIndex = this.scroll.DOM.onScrollActivateElements.findIndex(
      (item) => item.elNode === updatedBinding.elNode,
    );
    if (itemIndex > -1)
      this.scroll.DOM.onScrollActivateElements[itemIndex] = updatedBinding;
  },

  addOnScrollActivateElement(binding) {
    binding.containedMeshId = this.findMeshID(binding.elNode, true);
    binding.elNode.dataset.activeScroll = 'false';
    if (!binding.options.trackOnly) {
      binding.elNode.classList.add('show-on-scroll');
    }
    // this.scroll.DOM.onScrollActivateElements.push(binding);

    if (binding.options.fixToParentId) {
      setTimeout(() => {
        // timeout for rendering when page is changed
        binding.containerId = binding.options.fixToParentId;
        binding.options.scrollSpeed = 1;
        binding.bounds = binding.elNode.getBoundingClientRect();
        binding.containerEl = document.getElementById(binding.containerId);
        binding.childEl = binding.elNode.children[0];
        binding.containerBottom =
          binding.containerEl.getBoundingClientRect().bottom;
        binding.margin = 0;
        this.scroll.DOM.onScrollActivateElements.push(binding);
      }, 750);
      return;
    }
    this.scroll.DOM.onScrollActivateElements.push(binding);

    this.onActiveElCallback(binding, false);
  },

  findMeshID(elParent, isActiveScroll) {
    if (elParent.dataset.meshId) {
      elParent.dataset.scrollActive = 'true';
      return elParent.dataset.meshId;
    }

    let el = elParent.querySelector('[data-mesh-id]');
    if (!el) return false;

    el.dataset.scrollActive = isActiveScroll ? 'true' : undefined;
    return el.dataset.meshId;
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
    let bounds = htmlEl.getBoundingClientRect();
    let position = { top: bounds.top, left: bounds.left };
    position.top += this.currentScroll;

    //*****************************
    // MSDF
    //*****************************

    const fontUrl = '/font/PPFormula-CondensedBlack.fnt';
    const atlasUrl = '/font/PPFormula-CondensedBlack.png';

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

    Promise.all([loadFontAtlas(atlasUrl), loadFont(fontUrl)]).then(
      ([atlas, font]) => {
        const geometry = new MSDFTextGeometry({
          text: text.replaceAll(' ', ''),
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
            uColor: {
              value: new THREE.Color(theme === 'dark' ? '#1B1818' : '#BFC0B2'),
            },
            // Common
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
          vertexShader: MSDFvertex,
          fragmentShader: MSDFfragmentBlur,
        });

        material.uniforms.uMap.value = atlas;

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

        setTimeout(() => {
          if (!htmlEl.dataset.scrollActive) this.activateMesh(meshId, true);
        }, 250);
        if (mouseListeners) this.meshMouseListeners(newMesh, material);
      },
    );
  },
  addImageAsMesh(htmlEl, shader, meshId, mouseListeners) {
    let fragmentShader = this.options.default.fragmentShader;
    let vertexShader = this.options.default.vertexShader;

    if (shader) {
      fragmentShader = this.options[shader].fragmentShader;
      vertexShader = this.options[shader].vertexShader;
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

    let texture = new THREE.TextureLoader().load(htmlEl.src);
    texture.needsUpdate = true;

    let material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: texture },
        vectorVNoise: { value: new THREE.Vector2(1.5, 1.5) }, // 1.5
        hoverState: { value: 0 },
        aniIn: { value: 0 },
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
