<template>
  <span ref="img" class="webgl-img">
      <NuxtImg @load="imageLoaded" :width="width" :height="height" alt="picture" :src="srcLink"/>
  </span>
</template>

<script setup>

import {Canvas} from "~/utils/canvas";

let props = defineProps([
  'srcLink',
  'shader',
  'imageHover',
  'width',
  'height',
]);

const generateRandomId = () => {
  return  Math.floor(Math.random() * 100000);
}

const meshIdRandom = ref(generateRandomId())
const generatedMeshId = ref(props.srcLink + meshIdRandom.value)

const img = ref("img");
const imgLoaded = ref(false);

onMounted(async () => {
  addImageToCanvas(false)
})

const addImageToCanvas = (_timeout) => {
  setTimeout(() => {
    if (!img.value || img.value.children[0].getBoundingClientRect()?.width === 0) {
      addImageToCanvas(true)
      return
    }
    Canvas.addImageAsMesh(img.value.children[0], props.shader, generatedMeshId.value, false)
  }, _timeout ? 200 : 0)

};

const imageLoaded = () => {
  imgLoaded.value = true
};

watch(() => props.imageHover, (_status) => {
  Canvas.hoverMesh(generatedMeshId.value, _status);
});

onBeforeUnmount(() => {
  Canvas.removeMesh(generatedMeshId.value);
});

</script>

<style lang="scss" scoped>

img {

}

</style>