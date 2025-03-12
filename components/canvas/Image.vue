<template>
  <div class="webgl-img-wrapper" ref="imageWrapper">
    <img
      ref="image"
      class="webgl-img"
      alt="picture"
      :src="srcLink"
      @load="addImageToCanvas"
      :loading="loadStrategy === 'lazy' ? 'lazy' : 'eager'"
    />
    <!--    @load="imageLoaded"-->
    <!--    :preload="loadStrategy === 'preload'"-->
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
  uniforms: {
    type: Object,
    default: () => {},
  },
  loadStrategy: {
    type: String,
    default: 'lazy',
  },
});

const generatedMeshId = props.srcLink + crypto.randomUUID();

const image = ref('image');
const imageWrapper = ref('imageWrapper');
const imgAddedToCanvas = ref(false);

const meshUniforms = computed(() => {
  const uni = {};
  for (const key in props.uniforms) {
    uni[key] = {
      value: 0,
    };
  }
  return uni;
});

onMounted(() => {
  if (image.value && image.value.complete) {
    addImageToCanvas();
  }
});

const addImageToCanvas = async () => {
  if (imgAddedToCanvas.value) return;
  await Canvas.addImageAsMesh(
    image.value,
    props.shader,
    generatedMeshId,
    false,
    meshUniforms.value,
  );
  imgAddedToCanvas.value = true;
};

watch(
  () => props.uniforms,
  (uniforms) => {
    Canvas.meshUniformsUpdate(generatedMeshId, uniforms);
  },
  { deep: true },
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
