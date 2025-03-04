<template>
  <div id="appContainer">
    <SpeedInsights />
    <CommonNavigation :page-active="null" />

    <div id="scrollContainer">
      <div id="scrollableContent" ref="scrollableContent">
        <slot />
      </div>
    </div>

    <div
      id="animationContainer"
      ref="canvas"
      :class="{ 'back-layer': backLayerCanvas }"
    />
  </div>
</template>

<script setup lang="ts">
import { Display } from '~/utils/display';
import { Canvas } from '~/utils/canvas';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const navigationStore = useNavigationStore();

const backLayerCanvas = computed(() => {
  return (
    navigationStore.activeNavItem === 'home' || !navigationStore.navVisible
  );
});

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
