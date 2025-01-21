<template>
  <div class="main" :style="styles">
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
    styles: {
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
.main {
  width: 340px;
  aspect-ratio: 1/1;
  color: var(--light-color);
  background-color: var(--dark-color);
  padding: 50px 40px;
  text-align: left;
  //position: absolute;
}

.header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.iconFrame {
  display: inline-block;
  position: relative;
  bottom: 3px;
}
</style>
