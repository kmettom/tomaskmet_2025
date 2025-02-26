import {
  activeProjectTransition,
  nonActiveProjectTransition,
  openGalleryTransition,
  showGalleryControls,
  closeGalleryTransition,
} from '~/utils/animations/projects';
import { gsap } from 'gsap';

export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNavItem: 'home',
    navVisible: true,
    navContrastSwitched: false,
    navigationItems: [
      { name: 'Home', id: 'home' },
      { name: 'About', id: 'about' },
      { name: 'Work', id: 'work' },
      { name: 'Services', id: 'services' },
      { name: 'Contact us', id: 'contact' },
    ],
    projects: {
      galleryOpen: false,
      navigationVisible: false,
      htmlRefs: undefined,
      htmlSizeOrigins: null,
      activeProject: { index: 0, ref: null },
      pastActiveProject: { index: 0, ref: null },
      activeImageHeightVH: 0.7,
      margin: 1 - this.projects.activeImageHeightVH,
    },
  }),
  actions: {
    setActiveNavItem(id) {
      this.activeNavItem = id;
    },
    setNavVisible(visible) {
      this.navVisible = visible;
    },
    setNavContrast(contrastSwitched) {
      this.navContrastSwitched = contrastSwitched;
    },
    setProjectRefs(refs) {
      this.projects.htmlRefs = refs;
    },
    setGalleryRef(ref) {
      this.projects.htmlGalleryRef = ref;
    },
    async openGalleryProject(index) {
      if (!this.projects.galleryOpen) {
        await this.scrollToProject(index);
        this.setNavVisible(false);
        this.setProjectOriginSizes();
        Canvas.setFixedScrollToElement(
          this.projects.htmlRefs[index],
          this.projects.margin,
        );
        await openGalleryTransition(
          this.projects.htmlGalleryRef,
          this.projects.htmlRefs,
          this.projects.htmlSizeOrigins,
          this.projects.activeImageHeightVH,
        );
        Canvas.setFixedScrollToElement(null);
        this.setGalleryNavigationVisible(true);
        this.projects.galleryOpen = true;
        this.setActiveProject(index);
      }
    },
    setProjectOriginSizes() {
      if (this.projects.htmlSizeOrigins !== null) return;
      this.projects.htmlSizeOrigins = [];
      for (const ref of this.projects.htmlRefs) {
        const imageRef = ref.querySelector('.webgl-img');
        const imageBounds = imageRef.getBoundingClientRect();
        this.projects.htmlSizeOrigins.push({
          width: imageBounds.width,
          height: imageBounds.height,
        });
      }
    },
    async closeGallery() {
      Canvas.setFixedScrollToElement(
        this.projects.activeProject.ref,
        this.projects.margin,
      );
      this.setGalleryNavigationVisible(false);
      await this.closeActiveProject();
      await closeGalleryTransition(
        this.projects.htmlRefs,
        this.projects.htmlSizeOrigins,
      );
      this.setNavVisible(true);
      this.projects.galleryOpen = false;
      Canvas.setFixedScrollToElement(null);
      gsap.set('body', { overflow: 'auto' });
    },
    setGalleryNavigationVisible(visible) {
      this.projects.navigationVisible = visible;
      showGalleryControls(visible);
    },

    scrollToProject(index) {
      gsap.set('body', { overflow: 'auto' });
      const scrollDuration = 1.35;
      const htmlRef = this.projects.htmlRefs[index];
      const projectPosition =
        htmlRef.getBoundingClientRect().top +
        window.scrollY -
        this.projects.margin;
      Canvas.scrollTo(projectPosition, scrollDuration);
      const scrollDurationEnd = scrollDuration + 0.15;
      return new Promise((resolve) => {
        setTimeout(() => {
          gsap.set('body', { overflow: 'hidden' });
          resolve();
        }, scrollDurationEnd * 1000);
      });
    },
    setActiveProject(index) {
      if (!this.projects.galleryOpen) return;
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      this.projects.activeProject.index = index;
      this.projects.activeProject.ref = this.projects.htmlRefs[index];
      activeProjectTransition(this.projects.activeProject.ref);
      if (this.projects.pastActiveProject.ref) {
        nonActiveProjectTransition(this.projects.pastActiveProject.ref, 0.3);
      }
    },
    async closeActiveProject() {
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      this.projects.activeProject.index = 0;
      this.projects.activeProject.ref = null;
      await nonActiveProjectTransition(this.projects.pastActiveProject.ref);
    },
  },
});
