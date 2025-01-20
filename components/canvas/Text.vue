<template>
  <span class="text-wrapper" ref="html">
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
  theme: {
    type: String,
    default: 'dark',
  },
});

const html = ref('html');

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
  (_status) => {
    Canvas.hoverMesh(props.meshId, _status);
  },
);

onBeforeUnmount(() => {
  Canvas.removeMesh(props.meshId);
});
</script>

<style lang="scss" scoped>
.text-wrapper {
  //opacity: 0;
  display: inline-block;
}
</style>
