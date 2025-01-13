export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    activeNav: '',
  }),
  actions: {
    setActiveNav(name) {
      this.activeNav = name;
    },
  },
});
