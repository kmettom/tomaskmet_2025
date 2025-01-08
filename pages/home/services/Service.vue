<template>
  <div
    class="main"
    :style="isTablet ? [desktopStyles, tabletStyles] : desktopStyles"
  >
    <div class="header">
      <div class="iconFrame">
        {{ icon }}
      </div>
      <h4 class="heading-4">{{ title }}</h4>
    </div>
    <p class="body-m">{{ text }}</p>
  </div>
</template>

<script>
import { useNuxtApp } from '#app';

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    desktopStyles: {
      type: Object,
      default: () => {},
    },
    tabletStyles: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const { $viewport } = useNuxtApp();

    const isTablet = computed(() => $viewport.isLessThan('tablet'));
    return {
      isTablet,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/home/services/Service';
</style>
