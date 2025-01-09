<template>
  <div>
    <SectionHero />
    <SectionAbout />
    <Work />
    <Services />
    <SectionCta />
    <Footer />
  </div>
</template>

<script setup>
// import Container from '~/components/common/Container.vue';
import Work from '~/pages/index/works/Works.vue';
import Services from '~/pages/index/services/Services.vue';
import { onMounted, watch } from 'vue';
import SectionHero from '~/pages/index/SectionHero.vue';
import SectionAbout from '~/pages/index/SectionAbout.vue';
import SectionCta from '~/pages/index/SectionCTA.vue';
import Footer from '~/components/common/Footer.vue';

// const { data } = await useAsyncData('index', () =>
//   queryContent('/index').findOne(),
// );

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description:
    'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription:
    'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
});

// const hoverImage1 = ref(false);
// const hoverImage2 = ref(false);
// const projectsExpandedIndex = ref(0);
// const projectsExpanded = ref(false);

const props = defineProps({
  pageActive: Boolean,
});

const pageAniIn = () => {
  console.log('Example method - animate page transition');
};

onMounted(() => {
  if (props.pageActive) {
    pageAniIn();
  }
});

watch(
  () => props.pageActive,
  (newValue) => {
    if (newValue) {
      pageAniIn();
    }
  },
);
</script>

<style lang="scss"></style>
