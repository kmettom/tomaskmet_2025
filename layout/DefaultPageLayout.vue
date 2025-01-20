<template>
  <div id="appContainer">
    <CommonNavigation :page-active="null" />

    <div id="scrollContainer">
      <div id="scrollableContent" ref="scrollableContent">
        <slot />
      </div>
    </div>

    <div
      :class="{ 'back-layer': !navVisible }"
      id="animationContainer"
      ref="canvas"
    />
  </div>
</template>

<script setup lang="ts">
import { Display } from '~/utils/display';
import { Canvas } from '~/utils/canvas';

const navigationStore = useNavigationStore();

const navVisible = computed(() => navigationStore.navVisible);

const canvas = ref('canvas');

const scrollableContent = ref('scrollableContent');

onMounted(() => {
  Display.init();
  Canvas.init(canvas.value, scrollableContent.value);
});
</script>

<style lang="scss">
#scrollContainer {
  position: fixed;
  height: 100%;
  left: 0;
  width: 100%;
  overflow: hidden;
}

#scrollableContent {
  will-change: transform;
}

#animationContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  pointer-events: none;
  z-index: 0; //-1
  &.back-layer {
    z-index: -1; //-1
  }
}
</style>
