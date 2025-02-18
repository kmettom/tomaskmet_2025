<template>
  <span ref="html" class="text-wrapper">
    <slot />
  </span>
</template>

<script setup>
import { Canvas } from '~/utils/canvas';

const props = defineProps({
  shader: {
    type: String,
    required: true,
  },
  meshId: {
    type: String,
    required: true,
  },
  textHover: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: null,
  },
  theme: {
    type: String,
    default: 'dark',
  },
});

const html = ref('html');

const generatedMeshId = crypto.randomUUID();

onMounted(async () => {
  let innerHTML = html.value?.innerHTML;
  //remove nuxt slot comment from innerHTML, only once
  if (innerHTML.includes('<!--]-->'))
    innerHTML = innerHTML
      .slice(0, innerHTML.indexOf('<!--]-->'))
      .slice(innerHTML.indexOf('<!--[-->') + 9);
  // delay canvas initialization to wait for font loaded
  setTimeout(() => {
    Canvas.addTextAsMSDF(
      props.shader,
      props.meshId,
      html.value,
      innerHTML,
      props.theme,
      false,
    );
  }, 50);
});

watch(
  () => props.textHover,
  (isHovered) => {
    Canvas.hoverMesh(props.meshId, isHovered);
  },
);

watch(
  () => props.show,
  (show) => {
    Canvas.activateMesh(props.meshId, show === null ? true : show);
  },
);

onBeforeUnmount(() => {
  Canvas.removeMesh(props.meshId);
});
</script>

<style lang="scss" scoped>
.text-wrapper {
  opacity: 0;
  display: inline-block;
}
</style>
