<template>
  <div id="appContainer">
    <CommonNavigation :page-active="null" />

    <div id="scrollContainer">
      <div id="scrollableContent" ref="scrollableContent">
        <slot />
      </div>
    </div>

    <div id="animationContainer" ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { Display } from '~/utils/display';
import { Canvas } from '~/utils/canvas';

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
  top: 0px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  pointer-events: none;
  z-index: -1; //-1
}
</style>
