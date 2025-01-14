<template>
  <!-- NAVIGATION -->
  <div id="topNavigation" class="body-xs" v-if="navVisible">
    <div id="location">
      <span>Portugal</span>
      <span id="splitter">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span>{{ localTime }}</span>
    </div>

    <div>Folio {{ currentYear }}</div>

    <nav>
      <span :class="{ active: activeNav === 'home' }">Home</span>
      <span :class="{ active: activeNav === 'about' }">About</span>
      <span :class="{ active: activeNav === 'work' }">Work</span>
      <span :class="{ active: activeNav === 'services' }">Services</span>
      <span :class="{ active: activeNav === 'contact' }">Contact me</span>
    </nav>
  </div>
</template>
<script setup>
const navigationStore = useNavigationStore();

const currentYear = new Date().getFullYear().toString().slice(-2);

const localTime = ref('');
const timezone = 'Europe/Lisbon';

const activeNav = computed(() => navigationStore.activeNavItem);
const navVisible = computed(() => navigationStore.navVisible);
const navItems = computed(() => navigationStore.navItems);

let intervalId = null;
function updateLisbonTime() {
  localTime.value = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

onMounted(() => {
  updateLisbonTime();
  intervalId = setInterval(updateLisbonTime, 60000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<style lang="scss">
#topNavigation {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  z-index: 9;

  // site navigation
  & nav {
    display: flex;
    flex-direction: column;
    text-align: right;

    & span {
      cursor: pointer;
      line-height: 15px;

      &::before {
        opacity: 0;
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('public/icons/right-arrow.svg') no-repeat;
        background-size: cover;
        margin-right: 4px;
        position: relative;
        bottom: -4px;
        transform: translateX(-10px);
        transition: ease all 0.3s;
      }

      &:hover {
        font-weight: bold;
      }
      &.active {
        font-weight: bold;
        &::before {
          transform: translateX(0px);
          opacity: 1;
        }
      }
    }
  }

  & #location {
    display: flex;

    @include respond-width($w-xs) {
      flex-direction: column;

      #splitter {
        display: none;
      }
    }
  }
}
</style>
