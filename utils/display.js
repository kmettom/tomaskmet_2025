const Display = {
  isMobile: null,

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
    this.isMobile = window.innerWidth < 768;
  },
};

export { Display };
