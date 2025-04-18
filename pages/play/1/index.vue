<template>
  <div class="page-container">
    <h1 class="headline">
      <CanvasText :theme="'light'"> 1 </CanvasText>
    </h1>
    <div>
      x
    </div>

  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';
// import {addObjectPlay1} from "~/utils/play/play1";

useSeoMeta({
  title: 'Tomas Kmet - Web developer - Playground',
  ogTitle: 'Tomas Kmet - Web developer - Playground',
  description: 'Tomas Kmet - Web developer - Playground',
  ogDescription: 'Tomas Kmet - Web developer - Playground',
});

const props = defineProps({
  pageActive: Boolean,
});


onMounted(() => {
  if (props.pageActive) {
    // addObjectPlay1()
  }
});

</script>
<style lang="scss" scoped>
.play-1-img-wrapper {
  margin-left: 200px;
  width: 700px;
}
</style>
