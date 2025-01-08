<template>
  {{ srcLink }}
  <span ref="img" class="webgl-img">
    <NuxtImg
      :width="width"
      :height="height"
      alt="picture"
      :src="srcLink"
      @load="imageLoaded"
    />
<!--    <img-->
<!--        alt="picture"-->
<!--        src="public/images/01l.jpg"-->
<!--    />-->
    <img
        alt="picture"
        :src="require(srcLink)"
    />
  </span>
</template>

<script setup>
import { Canvas } from '~/utils/canvas';

const props = defineProps({
  srcLink: {
    type: String,
    required: true,
  },
  shader: {
    type: String,
    default: 'default',
  },
  imageHover: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 100000);
};

const meshIdRandom = ref(generateRandomId());
const generatedMeshId = ref(props.srcLink + meshIdRandom.value);

const img = ref('img');
const imgLoaded = ref(false);

onMounted(async () => {
  addImageToCanvas(false);
});

const addImageToCanvas = (_timeout) => {
  setTimeout(
    () => {
      if (
        !img.value ||
        img.value.children[0].getBoundingClientRect()?.width === 0
      ) {
        addImageToCanvas(true);
        return;
      }
      Canvas.addImageAsMesh(
        img.value.children[0],
        props.shader,
        generatedMeshId.value,
        false,
      );
    },
    _timeout ? 200 : 0,
  );
};

const imageLoaded = () => {
  imgLoaded.value = true;
};

watch(
  () => props.imageHover,
  (_status) => {
    Canvas.hoverMesh(generatedMeshId.value, _status);
  },
);

onBeforeUnmount(() => {
  Canvas.removeMesh(generatedMeshId.value);
});
</script>

<style lang="scss" scoped>
@import 'assets/scss/components/WebGlImage';
</style>
