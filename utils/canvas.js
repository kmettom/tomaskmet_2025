import {gsap} from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import scrollFragment from './shaders/scrollFragment.glsl';
import scrollVertex from './shaders/scrollVertex.glsl';

let Canvas = {
    scrollPosition: 0,
    scrollInProgress : false,
    container : null,
    pointer : {cursor: null , intersects: null },
    time: 0,
    scene: new THREE.Scene(),
    materials: [],
    imageStore: [],
    init(_canvasElement) {
        this.container = _canvasElement;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        let scroller = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            container: "#smooth-content",
            smooth: 1,
            effects: false,       // enable Data-set effects (default is false)
            smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
            onUpdate: (_data) => {
                this.scrollPosition = _data.progress;
            },
        });


        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 100, 2000 );
        this.camera.position.z = 600; // 600

        this.camera.fov = 2*Math.atan( (this.height/2)/600 )* (180/Math.PI);

        this.renderer = new THREE.WebGLRenderer({
            // antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio , 1.5));

        // SHADOW
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.container.appendChild( this.renderer.domElement );

        // this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.currentScroll = 0;
        this.raycaster = new THREE.Raycaster();
        this.pointer.cursor = new THREE.Vector2();

        this.setSize();

        // this.setLight()

        this.composerPass()

        this.render();

        window.addEventListener('pointermove', (event) => {
            this.pointer.cursor.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.cursor.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        });

        // this.render();

    },
    setImageMeshPositions(){
        const imgMargin = 20;

        if(!this.imageStore) return;

        for (var i = 0; i < this.imageStore.length ; i++) {

            if(this.imageStore[i].mesh.name.includes("imagegallery") ){
                this.imageStore[i].mesh.position.x = this.imageStore[i].left - this.width/2 + this.imageStore[i].width/2 ;
            }else {

                if(
                    this.currentScroll < this.imageStore[i].top + this.imageStore[i].height
                    && this.imageStore[i].top  < this.currentScroll + this.height
                    || this.galleryActive.value !== 0
                ){

                    let thumbOut = ( 1 - this.imageStore[i].thumbOutAction.value/1.5);
                    this.imageStore[i].mesh.position.x = imgMargin * this.galleryActive.value + ( this.imageStore[i].left * ( 1 - this.galleryActive.value ) - this.width/2 + this.imageStore[i].width/2) * thumbOut;

                    let galleryImgCoef = store.state.galleryHeight / document.body.offsetHeight ;
                    galleryImgCoef = galleryImgCoef >= 1 ? (this.currentScroll * galleryImgCoef) : ( - this.currentScroll * ( 1 - galleryImgCoef))

                    let thumbOutScrollCounter = 0 ;
                    // console.log("saveScrollPosition" , this.saveScrollPosition, this.currentScroll);
                    // if( this.imageStore[i].thumbOutAction.value !== 0 ){
                    //    thumbOutScrollCounter = this.saveScrollPosition;
                    // }
                    let galleryImgPos = (  ( galleryImgCoef ) - this.height/2 +  this.imageStore[i].top  - ( this.imageStore[i].height * i ) - imgMargin - ( imgMargin * i ) ) * this.galleryActive.value;
                    this.imageStore[i].mesh.position.y =  ( this.currentScroll + galleryImgPos - this.imageStore[i].top + this.height/2 - this.imageStore[i].height/2) * thumbOut + thumbOutScrollCounter;

                }
                else {
                    this.imageStore[i].mesh.position.y = this.height*2;
                }

            }

        }
    },
    composerPass(){
        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        //custom shader pass
        // var counter = 0.0;
        this.myEffect = {
            uniforms: {
                "tDiffuse": { value: null },
                "scrollSpeed": { value: null },
            },
            vertexShader: scrollVertex,
            fragmentShader: scrollFragment,
        }

        this.customPass = new ShaderPass(this.myEffect);
        this.customPass.renderToScreen = true;

        this.composer.addPass(this.customPass);
    },
    setSize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.width,this.height );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.render(this.scene, this.camera); // -> Also needed
    },
    render() {

        this.time+=0.05;

        // this.scroll.render();
        // this.scrollInProgress = this.currentScroll != this.scroll.scrollToRender ;
        // this.currentScroll = this.scroll.scrollToRender;

        // if(this.resizeInProgress ) {
        //   this.resetImageMeshPosition();
        // }

        //animate on scroll
        // if(
        //     this.scrollInProgress
        //     || ( 0 < this.galleryActive.value && this.galleryActive.value < 1)
        //     || this.thumbToArticleAnimation
        // ){

            this.customPass.uniforms.scrollSpeed.value = 0;
            // this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;
            this.setImageMeshPositions();

        // }

        //animate on hover
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].uniforms.time.value = this.time;
        }

        // this.checkGalleryImageHovers()

        this.composer.render()



        window.requestAnimationFrame(this.render.bind(this));

    },
    addImage(_img) {


    }
}

export {Canvas};

// class Canvas {
//     constructor() {
//         this.scrollPosition = 0;
//     }
//     init() {
//
//         gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
//         let scroller = ScrollSmoother.create({
//             wrapper: "#smooth-wrapper",
//             container: "#smooth-content",
//             smooth: 1,
//             effects: false,       // enable Data-set effects (default is false)
//             smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
//             onUpdate: (_data) => {
//                 // this.scrollPosition = _data.progress;
//                 this.scrollPosition = _data.progress;
//                 // console.log("log client - scroller - onUpdate", _data.progress );
//             },
//         });
//
//     }
//     addImage() {
//
//     }
// }

// export default Canvas;


