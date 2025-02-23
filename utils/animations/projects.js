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
        // Canvas.animateImageMesh = false;
        resolve();
      },
    });
    if (open) {
      timeline.to('.project-name', {
        duration: aniDuration,
        opacity: 0,
      });
      timeline.to('.project-image', {
        height: '70vh',
        width: '50%',
        duration: aniDuration,
      });
      timeline.to('.project-info-wrapper', {
        duration: aniDuration,
        width: '50%',
        height: '30vh',
      });
    } else {
      timeline.to('.project-image', {
        height: '150px',
        width: '400px',
        duration: aniDuration,
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
      // Canvas.animateImageMesh = false;
    },
  });

  timeline.to('.gallery-controls', {
    duration: 0.5,
    opacity: show ? 1 : 0,
  });
}

export function nonActiveProjectTransition(ref) {
  gsap.set(ref.querySelector('.expand-description'), { y: 0, opacity: 0 });
}

export function activeProjectTransition(ref) {
  // return new Promise((resolve) => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      resolve();
      // Canvas.animateImageMesh = false;
    },
  });

  timeline.set(ref.querySelector('.expand-description'), {
    opacity: 1,
  });

  const linesStatistics = new SplitText(ref.querySelector('.statistics'), {
    type: 'lines',
  }).lines;

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

  const wordsDescription = new SplitText(
    ref.querySelector('.project-description'),
    {
      type: 'words',
    },
  ).words;

  timeline.fromTo(
    wordsDescription,
    { y: '15px', opacity: 0 },
    {
      duration: 0.1,
      opacity: 1,
      y: '0px',
      stagger: 0.01,
    },
    '<',
  );

  timeline.fromTo(
    ref.querySelector('.project-link'),
    { y: '15px', opacity: 0 },
    {
      duration: 0.25,
      opacity: 1,
      y: '0px',
    },
  );
  // });
}
