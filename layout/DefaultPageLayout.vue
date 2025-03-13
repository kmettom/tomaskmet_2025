<template>
  <div id="appContainer">
    <!--    <SpeedInsights />-->
    <CommonNavigation :page-active="null" />

    <div id="scrollContainer">
      <div id="scrollableContent" ref="scrollableContent">
        <slot />
      </div>
    </div>

    <div
      id="animationContainer"
      ref="canvas"
      :style="`${windowHeight !== 0 ? windowHeight : '100vh'}`"
      :class="{ 'back-layer': backLayerCanvas }"
    />
  </div>
</template>

<script setup>
import { Display } from '~/utils/display';
import { Canvas } from '~/utils/canvas';
// import { SpeedInsights } from '@vercel/speed-insights/nuxt';

const navigationStore = useNavigationStore();
const windowHeight = ref(0)
const backLayerCanvas = computed(() => {
  return (
    navigationStore.activeNavItem === 'home' || !navigationStore.navVisible
  );
});

const canvas = ref('canvas');

const scrollableContent = ref('scrollableContent');

onMounted(async () => {
  windowHeight.value = window.innerHeight;
  Display.init();
  await Canvas.init(canvas.value, scrollableContent.value);
  navigationStore.canvasInitiated = true;
});
</script>

<style lang="scss">
#scrollContainer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#scrollableContent {
  will-change: transform;
}

#animationContainer {
  width: 100vw;
  height: 100vh;
  max-height: 100%;
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
