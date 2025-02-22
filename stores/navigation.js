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
    setProjectRefs(refs) {
      this.projects.projectItemRefs = refs;
    },
    async setGalleryOpen(index) {
      if(index === null){

      }else{

      }
      this.projects.galleryOpen = open;
      await openGalleryTransition(open);
      this.setGalleryNavigationVisible(open);
    },
    setGalleryNavigationVisible(visible) {
      this.projects.navigationVisible = visible;
      showGalleryControls(visible);
    },
    goToProject (vector) {
      const scrollDuration = 0.5;
      const projectMargin = index === 0 ? 0 : 100;
      const index = this.projects.activeProject.index + vector;
      const projectPosition =
          this.projects.projectItemRefs[index].getBoundingClientRect().top +
          window.scrollY -
          projectMargin;
      Canvas.scrollTo(projectPosition, scrollDuration);
    },
    setActiveProject(index, ref) {
      this.projects.pastActiveProject = { ...this.projects.activeProject };
      if (index === null) {
        this.projects.activeProject.index = 0;
        this.projects.activeProject.ref = null;
        // this.setGalleryOpen(false);
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
