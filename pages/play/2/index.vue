<template>
  <div class="page-container">
    <h1 class="headline">
      <CanvasText :theme="'light'" :uniforms="mainTextInUniforms">
        1
      </CanvasText>
    </h1>
    <div ref="play2el" class="play2-el">
      <div class="play-2-section">I</div>
      <div class="play-2-section"></div>
      <div class="play-2-section"></div>
      <div class="play-2-section"></div>
      <div class="play-2-section">X</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { infiniteLoopScrollSection } from '~/utils/play/play2';

useSeoMeta({
  title: 'Tomas Kmet - Web developer - Playground',
  ogTitle: 'Tomas Kmet - Web developer - Playground',
  description: 'Tomas Kmet - Web developer - Playground',
  ogDescription: 'Tomas Kmet - Web developer - Playground',
});

const mainTextInUniforms = {
  uAniInText: { value: 1, duration: 1 },
};

const play2el = ref('play2el');

onMounted(() => {
  setTimeout(() => {
    infiniteLoopScrollSection(play2el.value);
  }, 1000);
});
</script>
<style lang="scss" scoped>
.play2-el {
  width: 100%;
}
.play-2-section {
  height: 200px;
  margin: 50px;
  border: purple 2px solid;
  border-radius: 15px;
}
</style>
