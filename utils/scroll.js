import { Canvas } from './canvas';

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default class Scroll {
  constructor(options) {
    this.DOM = {
      scrollable: options.dom,
      scrollSpeedElements: [],
      onScrollActivateElements: [],
      scrollSpeedResizeBackup: [],
      onScrollTrackElements: [],
    };

    this.activeCallback = options.activeCallback;

    this.docScroll = 0;
    this.scrollToRender = 0;
    this.current = 0;
    this.ease = 0.1;
    this.speed = 0;
    this.speedTarget = 0;
    this.scrollTo = { target: 0, executed: true };

    this.setSize();
    this.getScroll();
    this.init();
    this.initEvents();
  }

  init() {
    this.current = this.scrollToRender = this.getScroll();
    this.setPosition();
  }

  getScroll() {
    this.docScroll = this.current =
      window.scrollY || document.documentElement.scrollTop;
    return this.docScroll;
  }

  resizeMobileBreakEvents() {
    if (window.innerWidth < 768) {
      for (const item of this.DOM.scrollSpeedElements) {
        item.elNode.style.transform = `translate3d(0,0px,0)`;
      }
      for (const item of this.DOM.onScrollActivateElements) {
        item.elNode.style.transform = `translate3d(0,0px,0)`;
      }
      if (this.DOM.scrollSpeedElements.length > 0) {
        this.DOM.scrollSpeedResizeBackup = this.DOM.scrollSpeedElements;
      }
      this.DOM.scrollSpeedElements = [];
    } else {
      if (
        this.DOM.scrollSpeedElements.length === 0 &&
        this.DOM.scrollSpeedResizeBackup.length > 0
      ) {
        this.DOM.scrollSpeedElements = this.DOM.scrollSpeedResizeBackup;
      }
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
      for (const item of this.DOM.scrollSpeedElements) {
        if (item.options?.includes('fixed')) {
          item.bounds = item.elNode.getBoundingClientRect();
          item.containerBottom =
            item.containerEl.getBoundingClientRect().bottom;
        }
      }

      this.resizeMobileBreakEvents();

      this.setSize();
    });
    window.addEventListener('scroll', () => {
      this.getScroll();
    });
  }

  setSize() {
    // set the heigh of the body in order to keep the scrollbar on the page
    document.body.style.height =
      this.DOM.scrollable.scrollHeight > window.innerHeight
        ? `${this.DOM.scrollable.scrollHeight}px`
        : `${window.innerHeight}px`;
  }

  setSpeedElementsPosition() {
    for (const item of this.DOM.scrollSpeedElements) {
      let speed =
        item.scrollSpeed || item.scrollSpeed === 0 ? item.scrollSpeed : false;
      if (item.options?.includes('fixed')) {
        const bounds = item.elNode.getBoundingClientRect();
        const containerBottom = item.containerEl.getBoundingClientRect().bottom;
        if (bounds.top < item.margin && containerBottom > item.margin + 250) {
          const fixedPosition =
            window.innerWidth > 992 ? -bounds.top + item.margin : 0;
          item.childEl.style.transform = `translate3d(0,${fixedPosition}px,0)`;
        }
      } else {
        const bounds = item.elNode.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          item.elNode.style.transform = `translate3d(0,${-1 * (this.scrollToRender - bounds.top) * speed}px,0)`;
        }
      }
    }
  }

  setElementActive(item, status) {
    if (status) {
      item.elNode.dataset.activeScroll = 'true';
      item.elNode.classList.add('active');
    } else {
      item.elNode.dataset.activeScroll = 'false';
      if (!item.trackOnly) item.elNode.classList.remove('active');
    }

    Canvas.onActiveElCallback(item, status);

    if (item.containedMeshId) {
      Canvas.activateMesh(item.containedMeshId, status);
    }
  }

  checkActiveElementsPosition() {
    for (const item of this.DOM.onScrollActivateElements) {
      const bounds = item.elNode.getBoundingClientRect();
      const activeRange = item.scrollActive
        ? (1 - item.scrollActive) * window.innerHeight
        : 0;

      if (
        bounds.top < window.innerHeight - activeRange &&
        (item.rangeFromTop || bounds.bottom > activeRange)
      ) {
        if (item.options?.includes('scroll'))
          Canvas.onScrollCallBack(
            item,
            window.innerHeight - bounds.top,
            this.speed,
          );
        if (item.elNode.dataset.activeScroll !== 'true') {
          this.setElementActive(item, true);
        }
      } else {
        if (item.elNode.dataset.activeScroll === 'true' && !item.aniInOnly) {
          this.setElementActive(item, false);
        }
      }
    }

    for (const item of this.DOM.onScrollTrackElements) {
      const bounds = item.elNode.getBoundingClientRect();
      const activeRange = window.innerHeight;
      if (
        bounds.top < activeRange &&
        (item.rangeFromTop || bounds.bottom > activeRange)
      ) {
        if (item.elNode.dataset.activeScroll !== 'true') {
          this.setElementActive(item, true);
        }
      } else {
        if (item.elNode.dataset.activeScroll === 'true') {
          this.setElementActive(item, false);
        }
      }
    }
  }

  setPosition() {
    if (
      Math.round(this.scrollToRender) !== Math.round(this.current) ||
      this.scrollToRender < 10 ||
      !this.scrollTo.executed
    ) {
      this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.scrollToRender}px,0)`;
    }

    if (this.DOM.scrollSpeedElements.length > 0) {
      this.setSpeedElementsPosition();
    }
    if (this.DOM.scrollSpeedElements.length > 0) {
      this.checkActiveElementsPosition();
    }
  }

  scrollRenderToFluid(_scrollTo) {
    window.scrollBy(0, _scrollTo.toString());
    document.documentElement.scrollTop = _scrollTo;
  }

  scrollRenderTo(_scrollTo) {
    this.scrollTo.executed = false;
    this.scrollTo.target = Number(_scrollTo);
    window.scrollBy(0, _scrollTo.toString());
    document.documentElement.scrollTop = _scrollTo;
  }

  scrollRender() {
    this.scrollToRender = this.scrollTo.target;
    const margin = 10;
    this.docScroll = 0;
    if (this.current <= this.scrollToRender + margin) {
      this.scrollTo.executed = true;
    }
  }

  render(_scrollTo, _fluid) {
    this.setSize();
    if (_scrollTo !== undefined && _fluid) {
      this.scrollRenderToFluid(_scrollTo);
    } else if (_scrollTo !== undefined && _fluid === false) {
      this.scrollRenderTo(_scrollTo);
    } else if (!this.scrollTo.executed) {
      this.scrollRender();
    } else {
      this.scrollToRender = Math.round(
        lerp(this.scrollToRender, this.current, this.ease),
      );
    }

    this.speed =
      Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
    this.speedTarget += (this.speed - this.speedTarget) * 0.2;
    this.setPosition();
  }
}
