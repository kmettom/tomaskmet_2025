<template>
  <div class="wrapper">
    <Hero></Hero>
    <About></About>
    <Work/>
    <Services></Services>
    <CTA></CTA>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Container from "~/components/common/Container.vue";
import Work from "~/components/sections/works/Works.vue";
import DownloadButton from "~/components/common/DownloadButton.vue";
import Services from "~/components/sections/services/Services.vue";
import services from '@/content/services.model.json';
import {onMounted, watch} from "vue";
import Hero from "~/components/sections/Hero.vue";
import About from "~/components/sections/About.vue";
import CTA from "~/components/sections/CTA.vue";
import Footer from "~/components/sections/Footer.vue";

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
@import "assets/scss/style";

//=======>>>   WRAPPER background image   <<<==========//
.wrapper {
  position: relative;
}






</style>
