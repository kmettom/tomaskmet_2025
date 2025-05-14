import gsap from "gsap";

export async function infiniteLoopScrollSection(imgHtmlEl) {
  console.log("infiniteLoopScrollSection", imgHtmlEl);

  if (!imgHtmlEl) {
    console.error("imgHtmlEl is required for infinite scrolling");
    return;
  }

  // Duplicate the content of the element for continuity
  const content = imgHtmlEl.innerHTML;
  imgHtmlEl.innerHTML = content + content;

  // Set up GSAP animation
  const scrollSpeed = 50; // Adjust this speed in pixels/second
  const contentWidth = imgHtmlEl.scrollWidth / 2; // Width of original content

  gsap.to(imgHtmlEl, {
    x: -contentWidth, // Scroll left by the content width
    duration: contentWidth / scrollSpeed, // Time taken based on speed
    ease: "none", // Linear scrolling
    repeat: -1, // Loop infinitely
    modifiers: {
      x: (x) => {
        // Reset position when scrolling exceeds width
        return gsap.utils.wrap(-contentWidth, 0, parseFloat(x)) + "px";
      },
    },
  });
}


// 1. Setup Virtual Scroll Container
const VirtualScroller = {
  containerHeight: 0,
  itemHeight: 0,
  totalItems: 0,
  visibleItems: [],

  init(config) {
    this.containerHeight = config.height;
    this.itemHeight = config.itemHeight;
    this.totalItems = config.totalItems;

    // Setup Intersection Observer
    const options = {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.recycleItems();
        }
      });
    }, options);

    // Observe sentinel elements
    observer.observe(document.querySelector('.sentinel-top'));
    observer.observe(document.querySelector('.sentinel-bottom'));
  },

  recycleItems() {
    requestAnimationFrame(() => {
      // Calculate visible range
      const scrollTop = container.scrollTop;
      const startIndex = Math.floor(scrollTop / this.itemHeight);
      const endIndex = Math.min(
          startIndex + Math.ceil(this.containerHeight / this.itemHeight),
          this.totalItems
      );

      // Update visible items using transforms
      this.visibleItems = this.getItemsInRange(startIndex, endIndex);
      this.updateDOM();
    });
  }
};
