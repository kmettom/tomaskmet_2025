import { Canvas } from './canvas';
import { setScrollActiveElements } from '~/utils/canvasHelpers';

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default class Scroll {
  constructor(options) {
    this.DOM = {
      scrollable: options.dom,
      onScrollActivateElements: [],
    };

    this.activeCallback = options.activeCallback;

    this.fixScrollTo = { htmlRef: null, margin: 0 }; //null | {ref: htmlRef, margin: Number}
    this.scrollToRender = 0;
    this.current = 0;
    this.ease = 0.1;
    this.speed = 0;
    this.speedTarget = 0;
    this.scrollSpeedBottomMargin = 250;
    this.scrollOnTrigger = false;

    this.setSize();
    this.getScroll();
    this.init();
    this.initEvents();
  }

  init() {
    this.getScroll();
    this.scrollToRender = this.current;
    this.move();
  }

  getScroll() {
    this.current = window.scrollY || document.documentElement.scrollTop;
  }

  resizeMobileBreakEvents() {
    if (window.innerWidth < 768) {
      for (const item of this.DOM.onScrollActivateElements) {
        if (item.options.fixToParentId) {
          item.bounds = item.elNode.getBoundingClientRect();
          item.containerBottom =
            item.containerEl.getBoundingClientRect().bottom;
        } else {
          item.elNode.style.transform = `translate3d(0,0px,0)`;
        }
      }
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
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

  setElementActive(item, isActive) {
    if (isActive) {
      item.elNode.dataset.activeScroll = 'true';
      setScrollActiveElements(item.elNode, item.containedMeshIds, 'true');
      item.elNode.classList.add('active');
      Canvas.onActiveElCallback(item);
    } else {
      item.elNode.dataset.activeScroll = 'false';
      setScrollActiveElements(item.elNode, item.containedMeshIds, 'false');
      if (!item.trackOnly) item.elNode.classList.remove('active');
    }

    if (item.containedMeshIds.length > 0 && !item.trackOnly) {
      for (const meshId of item.containedMeshIds) {
        Canvas.activateMesh(meshId, isActive);
      }
    }
  }

  setElementsScrollPositions() {
    if (this.DOM.onScrollActivateElements.length === 0) return;
    for (const item of this.DOM.onScrollActivateElements) {
      const bounds = item.elNode.getBoundingClientRect();

      let activeRange = item.options.activeRange ?? 1;
      let activeRangeOrigin = item.options.activeRangeOrigin ?? 1;

      let activeRangeOriginPx = activeRangeOrigin * window.innerHeight;

      let activeRangeInPx = (1 - activeRange) * activeRangeOriginPx;

      const itemRangeMargin = item.options.activeRangeMargin ?? 0;
      const activeFromTop =
        bounds.top - itemRangeMargin <= activeRangeOriginPx - activeRangeInPx;
      const activeFromBottom =
        !item.options.bidirectionalActivation ||
        bounds.bottom - itemRangeMargin >=
          activeRangeInPx + activeRangeOriginPx;

      if (activeFromTop && activeFromBottom) {
        if (item.options.onScrollCallback)
          item.options.onScrollCallback(item, this.speed);
        if (item.elNode.dataset.activeScroll !== 'true') {
          this.setElementActive(item, true);
        }
      } else {
        if (
          item.elNode.dataset.activeScroll === 'true' &&
          !item.options.activateOnce
        ) {
          this.setElementActive(item, false);
        }
      }

      //SCROLL SPEED
      if (item.options.scrollSpeed) {
        item.elNode.style.transition = `linear translate3d 0s`;

        let speed =
          item.options.scrollSpeed || item.options.scrollSpeed === 0
            ? item.options.scrollSpeed
            : false;

        if (item.options.fixToParentId) {
          const containerBottom =
            item.containerEl.getBoundingClientRect().bottom;
          if (
            bounds.top < item.margin &&
            containerBottom > item.margin + this.scrollSpeedBottomMargin
          ) {
            const fixedPosition = item.margin - bounds.top;
            item.childEl.style.transform = `translate3d(0,${fixedPosition}px,0)`;
          }
        } else {
          if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            item.elNode.style.transform = `translate3d(0,${-1 * (this.scrollToRender - bounds.top) * speed}px,0)`;
          }
        }
      } else {
        item.elNode.style.transition = `linear translate3d 0.3s`;
        item.elNode.style.transform = `translate3d(0,0,0)`;
      }
    }
  }

  setScrollPosition() {
    if (
      Math.round(this.scrollToRender) !== Math.round(this.current) ||
      this.scrollToRender < 10
    ) {
      this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.scrollToRender}px,0)`;
    }
  }

  scrollRenderToFluid(scrollTo) {
    window.scrollBy(0, scrollTo.toString());
    document.documentElement.scrollTop = scrollTo;
  }

  scrollRenderTo(scrollTo) {
    this.scrollToRender = scrollTo;
    window.scrollTo({
      left: 0,
      top: scrollTo,
      behavior: 'instant',
    });
    document.documentElement.scrollTop = scrollTo;
  }

  calculateScrollSpeed() {
    this.speed =
      Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
    this.speedTarget += (this.speed - this.speedTarget) * 0.2;
  }

  move() {
    this.setScrollPosition();
    this.setElementsScrollPositions();
  }

  render(scrollTo, fluid) {
    this.setSize();
    if (this.fixScrollTo.htmlRef) {
      const refPosition = this.fixScrollTo.htmlRef.getBoundingClientRect().top;
      const fixScrollToPosition = Math.round(
        this.scrollToRender + refPosition - this.fixScrollTo.margin,
      );

      this.scrollRenderTo(fixScrollToPosition);
    } else if (scrollTo !== undefined && fluid) {
      this.scrollRenderToFluid(scrollTo);
    } else if (scrollTo !== undefined && fluid === false) {
      this.scrollRenderTo(scrollTo);
    } else if (this.scrollOnTrigger) {
      //TODO: finish logic of scroll on trigger sections
      this.scrollToRender = Math.round(
        lerp(this.scrollToRender, this.current, this.ease),
      );
    } else {
      this.scrollToRender = Math.round(
        lerp(this.scrollToRender, this.current, this.ease),
      );
    }

    this.calculateScrollSpeed();
    this.move();
  }
}
