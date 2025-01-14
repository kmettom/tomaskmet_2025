export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNavItem: 'home',
    navVisible: true,
    // navItems: ['home', 'work', 'contact'],
  }),
  actions: {
    setActiveNavItem(name) {
      this.activeNavItem = name;
    },
  },
});
