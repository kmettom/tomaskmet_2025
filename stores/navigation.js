export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNav: 'xxx',
  }),
  actions: {
    setActiveNav(name) {
      this.activeNav = name;
    },
  },
});
