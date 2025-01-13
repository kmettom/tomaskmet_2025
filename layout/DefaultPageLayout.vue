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
@use '/assets/scss/components/DefaultPageLayout';
</style>
