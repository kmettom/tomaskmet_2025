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
    default: null,
  },
  hover: {
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

const meshId = crypto.randomUUID();

onMounted(async () => {
  let innerHTML = html.value?.innerHTML;
  //remove nuxt slot comment from innerHTML, only once
  if (innerHTML.includes('<!--]-->')) {
    const start = innerHTML.indexOf('<!--[-->') + 8; // Start after '<!--[-->'
    const end = innerHTML.indexOf('<!--]-->'); // End just before '<!--]-->'
    innerHTML = innerHTML.slice(start, end);
  }
  // delay canvas initialization to wait for font loaded
  setTimeout(() => {
    Canvas.addTextAsMSDF(
      props.shader,
      meshId,
      html.value,
      innerHTML,
      props.theme,
      false,
    );
  }, 50);
});

watch(
  () => props.hover,
  (isHovered) => {
    Canvas.hoverMesh(meshId, isHovered);
  },
);

watch(
  () => props.show,
  (show) => {
    Canvas.activateMesh(meshId, show === null ? true : show);
  },
);

onBeforeUnmount(() => {
  Canvas.removeMesh(meshId);
});
</script>

<style lang="scss" scoped>
.text-wrapper {
  opacity: 0;
  display: inline-block;
}
</style>
