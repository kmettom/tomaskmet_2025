import {
  activeProjectTransition,
  nonActiveProjectTransition,
  openGalleryTransition,
  showGalleryControls,
  closeGalleryTransition,
  // projectNumberAni,
} from '~/utils/animations/projects';
import { gsap } from 'gsap';
import { projectDefaults } from '~/constants/projectDefaults.js';

export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNavItem: 'home',
    navVisible: true,
    navContrastSwitched: false,
    navigationItems: [
      { name: 'Home', id: 'home' },
      { name: 'About', id: 'about' },
      { name: 'Services', id: 'services' },
      { name: 'Work', id: 'work' },
      { name: 'Contact', id: 'contact' },
    ],
    projects: {
      galleryOpen: false,
      navigationVisible: false,
      htmlRefs: undefined,
      htmlSizeOrigins: null,
      activeProject: { index: null, ref: null },
      pastActiveProject: { index: 0, ref: null },
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
        this.setNavVisible(false);
        this.setProjectOriginSizes();
        await this.scrollToProject(index);
        Canvas.setFixedScrollToElement(
          this.projects.htmlRefs[index],
          window.innerHeight * projectDefaults.margin,
        );
        await openGalleryTransition(
          this.projects.htmlGalleryRef,
          this.projects.htmlRefs,
          this.projects.htmlSizeOrigins,
          projectDefaults.activeImageHeightVH,
          projectDefaults.margin,
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
        window.innerHeight * projectDefaults.margin,
      );
      this.setGalleryNavigationVisible(false);
      await this.closeActiveProject();
      this.setNavVisible(true);
      await closeGalleryTransition(
        this.projects.htmlRefs,
        this.projects.htmlSizeOrigins,
        projectDefaults.margin,
      );
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
      const scrollDelay = 0;
      const htmlRef = this.projects.htmlRefs[index];
      const projectPosition =
        htmlRef.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight * projectDefaults.margin;
      Canvas.scrollTo(projectPosition, scrollDelay);
      const scrollDurationEnd = scrollDelay + 0.5;
      return new Promise((resolve) => {
        setTimeout(() => {
          gsap.set('body', { overflow: 'hidden' });
          resolve();
        }, scrollDurationEnd * 1000);
      });
    },
    setActiveProject(index) {
      // projectNumberAni(this.projects.htmlRefs[index]);
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
      this.projects.activeProject.index = null;
      this.projects.activeProject.ref = null;
      await nonActiveProjectTransition(this.projects.pastActiveProject.ref);
    },
  },
});
