const Display = {
  isMobile: null,
  mobileBreakPoint: 768,
  init() {
    this.setScreenSize();
    this.resizeListener();
  },
  resizeListener() {
    window.addEventListener('resize', () => {
      this.setScreenSize();
    });
  },
  setScreenSize() {
    if ((window.innerWidth < this.mobileBreakPoint && this.isMobile === false) || (window.innerWidth >= this.mobileBreakPoint && this.isMobile === true)) {
      window.location.reload();
    }
    this.isMobile = window.innerWidth < this.mobileBreakPoint;
  },
};

export { Display };
