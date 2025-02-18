<template>
  <div class="page-container">
    <NuxtLink aria-label="Go To Showcase" to="/public"> Go home </NuxtLink>
    <h1 class="headline">
      <CanvasText :shader="'default'"> Playground </CanvasText>
    </h1>
    <p class="">
      This is a showcase of examples and usage of NuxtThreeJSStarterPack, Nuxt
      framework with implemented ThreeJS library.
    </p>
    <div
      class="image-hover-block img-l-wrapper"
      @mouseover="hoverImage = true"
      @mouseleave="hoverImage = false"
    >
      <!--      <CanvasImage :width="'550'" :height="'365'" :imageHover="hoverImage" :shader="'example1'"-->
      <!--                   :srcLink="'imgs/01l.webp'"/>-->
    </div>
    <div class="">
      Developed by:
      <a target="_blank" href="https://tomaskmet.com">Tomas Kmet</a>
      <span>GitHub:</span>
      <a
        target="_blank"
        href="https://github.com/kmettom/NuxtThreeJSStarterPack"
        >NuxtThreeJSStarterPack</a
      >
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';

useSeoMeta({
  title: 'About Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'About Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'About Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'About Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
});

const props = defineProps({
  pageActive: Boolean,
});

const hoverImage = ref(false);
// const textHover = ref(false);

const pageAnimateIn = () => {
  // console.log('Example method - animate page transition');
};

onMounted(() => {
  if (props.pageActive) {
    pageAnimateIn();
  }
});

watch(
  () => props.pageActive,
  (newValue) => {
    if (newValue) {
      pageAnimateIn();
    }
  },
);
</script>
<style lang="scss" scoped></style>
