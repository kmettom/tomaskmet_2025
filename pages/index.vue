<template>
  <div class="wrapper">

    <Container>
      <div class="temp">Holla Tomas</div>
    </Container>

    <Container additionalClass="aboutSection">
      <h2 class="body-xs">About</h2>
      <div class="body-l">
        <p>A Self taught developer with managerial background and 8 years of hands on coding experience.</p>
        <p>WORKING WITH AGENCIES, COMPANIES and freelancers using broad spectrum frameworks and backend API's.</p>
        <p>Interested in developing web apps, dapps, websites and e-commerce, happily spending time with Web3 or animating
          with WebGl. Looking forward to learning more. Connected with a broad network to fit the needs of a wide range of
          projects.</p>
        <p>Collaborate with other developers, designers and marketers to shape and create brands, experiences and products
          together.</p>
        <DownloadButton />
      </div>
    </Container>


  </div>
</template>

<script setup>
import Container from "@/components/common/container.vue";
import DownloadButton from "@/components/common/downloadButton.vue";
import { onMounted, watch } from "vue";

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
})

const hoverImage1 = ref(false);
const hoverImage2 = ref(false);

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

// Global
.wrapper {}


.temp {
  margin-bottom: 50px;
}


//=======>>>   ABOUT   <<<==========//

.aboutSection {
  display: grid;
  grid-template-columns: 10fr 14fr;
  text-transform: uppercase;
  border: 1px solid blueviolet;

  @include respond-width($w-m-s) {
    padding: 40px;
  }

  @include respond-width($w-xs) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
}





// .inline-example {
//   vertical-align: top;
//   display: inline-block;
//   padding-right: 20px;
// }

// #fixedElContainer {
//   height: 1250px;
//   position: relative;
//   margin-top: 75px;

//   &:before {
//     left: -20px;
//     content: '';
//     position: absolute;
//     height: 100%;
//     width: 2px;
//     background: #1B1818;
//   }
// }

// .scroll-top-btn {
//   text-align: center;
//   margin-top: 70px;
//   cursor: pointer;
//   padding: 35px 0px;
//   text-decoration: underline;
// }
</style>
