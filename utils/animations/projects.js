import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export function openGalleryTransition(galleryRef, refs, sizeOrigins) {
  const aniDuration = 0.5; // 0.5
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        resolve();
      },
    });
    const galleryWidthHalfPx =
      galleryRef.getBoundingClientRect().width / 2 + 'px';

    const nameChars = new SplitText('.project-name', {
      type: 'words,chars',
    });
    timeline.to(nameChars.chars, {
      duration: 0.1,
      y: -10,
      opacity: 0,
      stagger: 0.02,
      onComplete: () => {
        nameChars.revert();
      },
    });
    timeline.set('.project-name', { opacity: 0 });
    timeline.to('.project-info-wrapper', {
      duration: aniDuration,
      width: galleryWidthHalfPx,
      height: '30vh',
    });
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
          height: '70vh',
          width: galleryWidthHalfPx,
          duration: aniDuration,
        },
        '<',
      );
    }
  });
}

export function closeGalleryTransition(refs, sizeOrigins) {
  const aniDuration = 0.3; // 0.5
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        resolve();
      },
    });
    for (const [index, ref] of refs.entries()) {
      //TODO: check the cause of Refs array having more items
      if (!sizeOrigins[index]) return;
      timeline.to(ref.querySelector('.project-image'), {
        height: sizeOrigins[index].height + 'px',
        width: sizeOrigins[index].width + 'px',
        duration: aniDuration,
      });
    }
    timeline.to(
      '.project-info-wrapper',
      {
        duration: aniDuration,
        height: 0,
        width: 0,
      },
      '<',
    );
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
