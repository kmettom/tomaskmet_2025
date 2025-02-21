import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
const aniDuration = 0.5;

export function openGalleryTransition(open) {
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        Canvas.animateImageMesh = false;
        resolve();
      },
    });
    if (open) {
      timeline.to('.project-name', {
        duration: aniDuration,
        opacity: 0,
      });
      timeline.to('.project-image', {
        // height: '30vh',
        width: '50%',
        duration: aniDuration,
      });
      timeline.to('.project-info-wrapper', {
        duration: aniDuration,
        width: '50%',
        // height: '30vh',
      });
    } else {
      timeline.to('.project-image', {
        height: '150px',
        width: '400px',
        duration: aniDuration,
      });
      timeline.to('.expand-description > * ', {
        duration: aniDuration,
        opacity: 0,
        stagger: 0.1,
      });
      timeline.to('.project-info-wrapper', {
        duration: aniDuration,
        height: 0,
        width: 0,
      });
      timeline.to('.project-name', {
        duration: aniDuration,
        opacity: 1,
      });
    }
  });
}

export function showGalleryControls(show) {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
    },
  });
  timeline.to('.gallery-controls', {
    duration: 0.5,
    opacity: show ? 1 : 0,
  });
}

export function activeProjectTransition() {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
    },
  });

  const baseSelector = ' .project .active-project .expanded ';

  const linesStatistics = new SplitText(
    baseSelector + '.expand-description .statistics ',
    {
      type: 'lines',
    },
  ).lines;
  const wordsDescription = new SplitText(
    baseSelector + '.project-description',
    {
      type: 'words',
    },
  ).words;

  timeline.set(baseSelector + '.expand-description > * ', {
    opacity: 1,
  });

  timeline.fromTo(
    linesStatistics,
    { y: '15px', opacity: 0 },
    {
      duration: 0.2,
      opacity: 1,
      y: '0px',
      stagger: 0.1,
    },
  );
  timeline.fromTo(
    wordsDescription,
    { y: '15px', opacity: 0 },
    {
      duration: 0.1,
      opacity: 1,
      y: '0px',
      stagger: 0.01,
    },
  );
}

// const tl = gsap.timeline();
// tl.fromTo(
//     '.project-info-wrapper .statistics',
//     { y: '15px', opacity: 0 },
//     { y: 0, opacity: 1, duration: 1.3 },
// );
// if (isActive) {
//   tl.play();
// } else {
//   tl.play().reverse();
// }
