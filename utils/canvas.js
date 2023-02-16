import {gsap} from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


class CanvasClass {

    constructor(options){

        this.scrollPosition = 0;

    }
    init() {
        console.log("CanvasService init");

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        let scroller = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            container: "#smooth-content",
            smooth: 1,
            effects: false,       // enable Data-set effects (default is false)
            smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
            onUpdate: (_data) => {
                this.scrollPosition = _data.progress;
                // console.log("log client - scroller - onUpdate", _data.progress );
            },
        });

    }

}

const Canvas = new CanvasClass();

export {Canvas};

