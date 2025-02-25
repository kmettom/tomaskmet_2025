import {
  activeProjectTransition,
  nonActiveProjectTransition,
  openGalleryTransition,
  showGalleryControls,
  closeGalleryTransition,
} from '~/utils/animations/projects';

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
      margin: 100,
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
    async openGalleryProject(index) {
      if (!this.projects.galleryOpen) {
        const htmlRef = this.projects.htmlRefs[index];
        await this.scrollToProject(index);
        Canvas.setFixedScrollToElement(htmlRef, this.projects.margin);
        this.setNavVisible(false);
        this.setProjectOriginSizes();
        await openGalleryTransition();
        this.setGalleryNavigationVisible(true);
        this.projects.galleryOpen = true;
        this.setActiveProject(index);
        Canvas.setFixedScrollToElement(null);
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
      this.projects.galleryOpen = false;
      this.setGalleryNavigationVisible(false);
      this.closeActiveProject();
      await closeGalleryTransition(
        this.projects.htmlRefs,
        this.projects.htmlSizeOrigins,
      );
      this.setNavVisible(true);
      Canvas.setFixedScrollToElement(null);
    },
    setGalleryNavigationVisible(visible) {
      this.projects.navigationVisible = visible;
      showGalleryControls(visible);
    },

    scrollToProject(index) {
      const scrollDuration = 0.5;
      const htmlRef = this.projects.htmlRefs[index];
      const projectPosition =
        htmlRef.getBoundingClientRect().top +
        window.scrollY -
        this.projects.margin;
      Canvas.scrollTo(projectPosition, scrollDuration);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, scrollDuration * 1000);
      });
    },
    setActiveProject(index) {
      if (!this.projects.galleryOpen) return;
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      this.projects.activeProject.index = index;
      this.projects.activeProject.ref = this.projects.htmlRefs[index];
      activeProjectTransition(this.projects.activeProject.ref);
      if (this.projects.pastActiveProject.ref) {
        nonActiveProjectTransition(this.projects.pastActiveProject.ref);
      }
    },
    closeActiveProject() {
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      this.projects.activeProject.index = 0;
      this.projects.activeProject.ref = null;
      nonActiveProjectTransition(this.projects.pastActiveProject.ref);
    },
  },
});
