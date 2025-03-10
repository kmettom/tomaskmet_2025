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
  uniforms: {
    type: Object,
    default: () => {},
  },
  theme: {
    type: String,
    default: 'dark',
  },
});

const html = ref('html');

const meshId = crypto.randomUUID();

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
      meshUniforms.value,
    );
  }, 0);
});

watch(
  () => props.uniforms,
  (uniforms) => {
    Canvas.meshUniformsUpdate(meshId, uniforms);
  },
  { deep: true },
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
