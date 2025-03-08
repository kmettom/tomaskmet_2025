import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

// export function projectNumberAni(ref) {
//   const numbers = new SplitText(ref.querySelector('.project-index'), {
//     type: 'words,chars',
//   }).chars;
//   const tl = gsap.timeline();
//   tl.to(numbers, {
//     duration: 0.25,
//     opacity: 0,
//     y: 10,
//     stagger: 0.05,
//   });
//   tl.set(numbers, {
//     opacity: 0,
//     y: -10,
//   });
//   tl.to(numbers, {
//     duration: 0.35,
//     opacity: 1,
//     y: 0,
//     stagger: 0.05,
//   });
// }

export function openGalleryTransition(
  galleryRef,
  refs,
  sizeOrigins,
  slideHeight,
  projectMargin,
) {
  const aniDuration = 0.3; // 0.5
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      ease: 'linear',
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        resolve();
      },
    });

    timeline.to('.gallery-controls-margin', {
      duration: aniDuration,
      height: `${projectMargin * 100}vh`,
    });
    timeline.to(
      '.project-item',
      {
        paddingTop: `${(projectMargin * 100) / 2}vh`,
        duration: aniDuration,
      },
      '<',
    );
    const galleryWidthHalfPx =
      galleryRef.getBoundingClientRect().width / 2 + 'px';

    const nameChars = new SplitText('.project-name', {
      type: 'words,chars',
    });
    timeline.to(
      nameChars.chars,
      {
        duration: 0.1,
        y: -10,
        opacity: 0,
        stagger: 0.02,
        onComplete: () => {
          nameChars.revert();
          gsap.set('.project-name', { opacity: 0 });
        },
      },
      '<',
    );
    timeline.to(
      '.project-info-wrapper',
      {
        duration: aniDuration,
        width: galleryWidthHalfPx,
        height: '30vh',
      },
      '<+=0.15',
    );
    for (const [index, ref] of refs.entries()) {
      if (!sizeOrigins[index]) return;
      timeline.fromTo(
        ref.querySelector('.project-image'),
        {
          height: sizeOrigins[index].height + 'px',
          width: sizeOrigins[index].width + 'px',
          immediateRender: true,
        },
        {
          height: `${slideHeight * 100}vh`,
          width: galleryWidthHalfPx,
          duration: aniDuration,
        },
        '<',
      );
    }
  });
}

export function closeGalleryTransition(refs, sizeOrigins, projectMargin) {
  const aniDuration = 0.3; // 0.5
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      ease: 'linear',
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        resolve();
      },
    });
    timeline.to(
      '.project-item',
      {
        paddingTop: `${projectMargin * 100}vh`,
        duration: aniDuration,
      },
      '<',
    );
    timeline.to(
      '.project-info-wrapper',
      {
        duration: aniDuration,
        height: '0',
        width: '0',
      },
      '<',
    );
    for (const [index, ref] of refs.entries()) {
      //TODO: check the cause of Refs array having more items
      if (!sizeOrigins[index]) return;
      timeline.to(
        ref.querySelector('.project-image'),
        {
          height: sizeOrigins[index].height + 'px',
          width: sizeOrigins[index].width + 'px',
          duration: aniDuration,
        },
        '<',
      );
    }

    const nameChars = new SplitText('.project-name', {
      type: 'words,chars',
    });
    timeline.set('.project-name', { opacity: 1 });
    timeline.fromTo(
      nameChars.chars,
      {
        y: -10,
        opacity: 0,
      },
      {
        duration: 0.1,
        y: 0,
        opacity: 1,
        stagger: 0.02,
        onComplete: () => {
          nameChars.revert();
        },
      },
      '<',
    );
    timeline.set('.project-name', { opacity: 1 });
  });
}

export function showGalleryControls(show) {
  const timeline = gsap.timeline({
    ease: 'linear',
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      // Canvas.animateImageMesh = false;
    },
  });

  timeline.to('.gallery-controls', {
    duration: 0.5,
    zIndex: show ? 10 : -1,
    opacity: show ? 1 : 0,
  });
}

export function nonActiveProjectTransition(ref, duration = 0) {
  return new Promise((resolve) => {
    gsap.to(ref.querySelector('.expand-description'), {
      y: 0,
      opacity: 0,
      duration: duration,
      onComplete: () => {
        resolve();
      },
    });
  });
}

export function activeProjectTransition(ref) {
  // return new Promise((resolve) => {
  const timeline = gsap.timeline({
    ease: 'linear',
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      // resolve();
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
    { y: '15px', opacity: 0, filter: 'blur(15px)' },
    {
      duration: 0.2,
      opacity: 1,
      y: '0px',
      stagger: 0.1,
      filter: 'blur(0px)',
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
}
