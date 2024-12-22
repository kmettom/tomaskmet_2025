<template>
    <Hero/>
    <About/>
  <Work/>
    <Services/>
    <CTA/>
    <Footer/>
</template>

<script setup>
import Container from "~/components/common/Container.vue";
import Work from "~/pages/home/works/Works.vue";
import Services from "~/pages/home/services/Services.vue";
import services from '@/content/services.model.json';
import {onMounted, watch} from "vue";
import Hero from "~/pages/home/Hero.vue";
import About from "~/pages/home/About.vue";
import CTA from "~/pages/home/CTA.vue";
import Footer from "~/pages/home/Footer.vue";

const {data} = await useAsyncData('index', () => queryContent('/index').findOne())

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
})

const hoverImage1 = ref(false);
const hoverImage2 = ref(false);

const projectsExpandedIndex = ref(0);
const projectsExpanded = ref(false);

const props = defineProps({
  pageActive: Boolean
});

const pageAniIn = () => {
  console.log('Example method - animate page transition')
};


onMounted(() => {
  if (props.pageActive) {
    pageAniIn();
  }
});

watch(
    () => props.pageActive,
    (newValue, oldValue) => {
      if (newValue) {
        pageAniIn();
      }
    }
);


</script>

<style lang="scss">

</style>
