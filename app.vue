<template>
  <CommonWelcomeScreen
    :welcome-init="welcomeInit"
    @welcome-complete="welcomeFinished()"
  />
  <DefaultPageLayout
    :transition="{
      name: 'pagetransition',
      onBeforeEnter: (el) => {
        Canvas.scrollToTop(0);
      },
    }"
  >
    <NuxtPage :page-active="contentActive" />
  </DefaultPageLayout>
  <CanvasCursor v-if="contentActive" />
</template>
<script setup>
import { Canvas } from '~/utils/canvas';
import DefaultPageLayout from '~/layout/DefaultPageLayout.vue';

const welcomeInit = ref(false);

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  style: [
    {
      children: `
      html {
              background-color: #1b1818;
            }
      `,
    },
  ],
});

onMounted(() => {
  welcomeInit.value = true;
});

const contentActive = ref(false);
const welcomeFinished = () => {
  contentActive.value = true;
};
</script>
