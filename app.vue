<template>
  <CommonWelcome
    :welcome-init="welcomeInit"
    @welcome-complete="welcomeFinished()"
  />
  <DefaultPageLayout>
    <NuxtPage
      :page-active="contentActive"
      :transition="{
        name: 'pagetransition',
        onBeforeEnter: (el) => {
          Canvas.scrollToTop(0);
        },
      }"
    />
  </DefaultPageLayout>
</template>
<script setup>
import { Canvas } from '~/utils/canvas';
// import { Display } from '~/utils/display';
import DefaultPageLayout from '~/layout/DefaultPageLayout.vue';

const welcomeInit = ref(false);

useHead({
  htmlAttrs: {
    lang: 'en',
  },
});

onMounted(() => {
  welcomeInit.value = true;
});

const contentActive = ref(false);
const welcomeFinished = () => {
  contentActive.value = true;
};
</script>
