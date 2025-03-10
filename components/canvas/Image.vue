<template>
  <div class="webgl-img-wrapper">
    <img
      ref="image"
      class="webgl-img"
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
  uniforms: {
    type: Object,
    default: () => {},
  },
});

const generatedMeshId = props.srcLink + crypto.randomUUID();

const image = ref('image');
const imgLoaded = ref(false);

const meshUniforms = computed(() => {
  const uni = {};
  for (const key in props.uniforms) {
    uni[key] = {
      value: 0,
    };
  }
  return uni;
});

onMounted(async () => {
  addImageToCanvas(false);
});

const addImageToCanvas = async (_timeout) => {
  await Canvas.addImageAsMesh(
    image.value,
    props.shader,
    generatedMeshId,
    false,
    meshUniforms.value,
  );
};

const imageLoaded = () => {
  imgLoaded.value = true;
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
