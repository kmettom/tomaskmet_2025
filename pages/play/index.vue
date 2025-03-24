<template>
  <div class="page-container">
    <h1 class="headline">
      <CanvasText :theme="'light'"> Playground </CanvasText>
    </h1>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';

useSeoMeta({
  title: 'Tomas Kmet - Web developer - Playground',
  ogTitle: 'Tomas Kmet - Web developer - Playground',
  description: 'Tomas Kmet - Web developer - Playground',
  ogDescription: 'Tomas Kmet - Web developer - Playground',
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
