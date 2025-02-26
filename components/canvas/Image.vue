<template>
  <div ref="imageWrapper" class="webgl-img-wrapper">
    <NuxtImg
      class="webgl-img"
      :width="width"
      :height="height"
      alt="picture"
      :src="srcLink"
      @load="imageLoaded"
    />
  </div>
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
  hover: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: true,
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

const generatedMeshId = props.srcLink + crypto.randomUUID();

const imageWrapper = ref('imageWrapper');
const imgLoaded = ref(false);

onMounted(async () => {
  addImageToCanvas(false);
});

const addImageToCanvas = (_timeout) => {
  setTimeout(
    () => {
      if (
        !imageWrapper.value ||
        imageWrapper.value.children[0]?.getBoundingClientRect()?.width === 0
      ) {
        addImageToCanvas(true);
        return;
      }
      Canvas.addImageAsMesh(
        imageWrapper.value.children[0],
        props.shader,
        generatedMeshId,
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
  () => props.hover,
  (isHovered) => {
    Canvas.hoverMesh(generatedMeshId, isHovered);
  },
);

watch(
  () => props.show,
  (isVisible) => {
    Canvas.activateMesh(generatedMeshId, isVisible);
  },
);

onBeforeUnmount(() => {
  Canvas.removeMesh(generatedMeshId);
});
</script>

<style lang="scss" scoped>
.webgl-img {
  max-width: 100%;
  max-height: 100%;
  opacity: 0;
}
</style>
