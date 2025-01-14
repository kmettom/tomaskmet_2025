export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNavItem: 'home',
    navVisible: true,
    navContrastSwitched: false,
    // navItems: ['home', 'about', 'work', 'services' , 'contact'],
  }),
  actions: {
    setActiveNavItem(name) {
      this.activeNavItem = name;
    },
    setNavVisible(visible) {
      this.navVisible = visible;
    },
    setNavContrast(contrastSwitched) {
      this.navContrastSwitched = contrastSwitched;
    }
  },
});
