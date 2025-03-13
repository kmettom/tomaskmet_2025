<template>
  <div class="webgl-img-wrapper">
    <img
      ref="image"
      class="webgl-img"
      :alt="alt"
      :src="srcLink"
      :loading="loadStrategy === 'lazy' ? 'lazy' : 'eager'"
      @load="addImageToCanvas"
    />
    <!--    :loading="loadStrategy === 'lazy' ? 'lazy' : 'eager'"-->
    <!--    @load="imageLoaded"-->
    <!--    :preload="loadStrategy === 'preload'"-->
  </div>
</template>

<script setup>
import { Canvas } from '~/utils/canvas';
const navigationStore = useNavigationStore();

const props = defineProps({
  alt: {
    type: String,
    default: 'picture',
    // required: true,
  },
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

const addImageToCanvas = () => {
  if (imgAddedToCanvas.value) return;
  Canvas.addImageAsMesh(
    image.value,
    props.shader,
    generatedMeshId,
    false,
    meshUniforms.value,
  );
  imgAddedToCanvas.value = true;
};

onMounted(() => {
  image.value.dataset.meshId = generatedMeshId;
});

watch(
  () => navigationStore.canvasInitiated,
  (newVal) => {
    if (newVal && image.value.naturalWidth !== 0) {
      addImageToCanvas();
    }
  },
);

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
