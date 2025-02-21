import {
  activeProjectTransition,
  nonActiveProjectTransition,
  openGalleryTransition,
  showGalleryControls,
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
      activeProject: { index: 0, ref: null },
      pastActiveProject: { index: 0, ref: null },
      projectItemRefs: undefined,
    },
    // navItems: ['home', 'about', 'work', 'services' , 'contact'],
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
    async setGalleryOpen(open) {
      this.projects.galleryOpen = open;
      await openGalleryTransition(open);
      this.setGalleryNavigationVisible(open);
    },
    setGalleryNavigationVisible(visible) {
      this.projects.navigationVisible = visible;
      showGalleryControls(visible);
    },
    setProjectRefs(refs) {
      this.projects.projectItemRefs = refs;
    },
    setActiveProject(index, ref) {
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      if (index === null) {
        this.projects.activeProject.index = 0;
        this.projects.activeProject.ref = null;
        this.setGalleryOpen(false);
      } else {
        this.projects.activeProject.index = index;
        this.projects.activeProject.ref = ref;
        activeProjectTransition(ref);
      }
      if (this.projects.pastActiveProject.ref)
        nonActiveProjectTransition(this.projects.pastActiveProject.ref);
    },
  },
});
