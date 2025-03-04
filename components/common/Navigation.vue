<template>
  <div class="body-xs navigation-bar" :class="{ dark: navContrastSwitched }">
    <div class="location">
      <span>Portugal</span>
      <span id="splitter">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span>{{ localTime }}</span>
    </div>

    <div>Folio {{ currentYear }}</div>

    <nav class="navigation-items">
      <span
        v-for="navItem in navigationItems"
        :key="navItem.id"
        class="navigation-item"
        :class="{ active: activeNav === navItem.id }"
        @click="goToSection(navItem.id)"
        v-set-data-attrs="{ cursorsize: 30, cursoropacity: 0.7 }"
      >
        {{ navItem.name }}
      </span>
    </nav>
  </div>
</template>
<script setup>
import {
  navigationFirstEnter,
  navigationShow,
} from '~/utils/animations/navigation';

const navigationStore = useNavigationStore();

const goToSection = (sectionId) => {
  Canvas.scrollToElBySelector(
    `.page-section[data-nav-id="${sectionId}"]`,
    0.75,
  );
};

const currentYear = new Date().getFullYear().toString().slice(-2);

const localTime = ref('');
const timezone = 'Europe/Lisbon';

const navigationItems = computed(() => navigationStore.navigationItems);
const activeNav = computed(() => navigationStore.activeNavItem);
const navContrastSwitched = computed(() => navigationStore.navContrastSwitched);

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
  navigationFirstEnter();
});

onUnmounted(() => {
  clearInterval(intervalId);
});

watch(
  () => navigationStore.navVisible,
  (isVisible) => {
    navigationShow(isVisible);
  },
);
</script>
<style lang="scss">
.navigation-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  z-index: 9;
  opacity: 0;

  &.dark {
    color: var(--dark-color);

    .navigation-item {
      &:after {
        color: var(--dark-color);
      }
    }
  }
}

.navigation-items {
  display: flex;
  flex-direction: column;
  text-align: right;
}
.navigation-item {
  cursor: pointer;
  line-height: 20px;
  &:before {
    opacity: 0;
    content: '👉';
    display: inline-block;
    margin-right: 4px;
    position: relative;
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

.location {
  display: flex;
  @include respond-width($w-xs) {
    flex-direction: column;
    #splitter {
      display: none;
    }
  }
}
</style>
