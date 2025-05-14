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