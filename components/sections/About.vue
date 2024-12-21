<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <Container id="about" additionalClass="aboutSection">
    <h2 class="body-xs">About</h2>
    <div class="body-l">
      <p>A Self taught developer with managerial background and 8 years of hands on coding experience.</p>
      <p>WORKING WITH AGENCIES, COMPANIES and freelancers using broad spectrum frameworks and backend API's.</p>
      <p>Interested in developing web apps, dapps, websites and e-commerce, happily spending time with Web3 or
        animating
        with WebGl. Looking forward to learning more. Connected with a broad network to fit the needs of a wide range
        of
        projects.</p>
      <p>Collaborate with other developers, designers and marketers to shape and create brands, experiences and
        products
        together.</p>
      <!--        <DownloadButton />-->
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/common/container.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

//=======>>>   HERO   <<<==========//
.heroSection {
  height: 600px;
  position: relative;


  &[data-v-4c47fd49] {
    margin-top: 100px;
    max-width: 1048px;
    margin-bottom: 100px;

    @include respond-width($w-m) {
      max-width: 780px;
      height: 420px;
    }

    @include respond-width($w-s) {
      max-width: 326px;
      height: 188px;
      margin-top: 0px;
      margin-bottom: 100px;
    }
  }

  #kmet {
    position: absolute;
    bottom: 45px;
    right: 0;

    @include respond-width($w-s) {
      bottom: 0px;
    }
  }

  #summary {
    position: absolute;
    top: 160px;
    right: 0;

    @include respond-width($w-m) {
      top: 76px;
    }

    @include respond-width($w-s) {
      top: 174px;
      right: -25px;
    }
  }

  #servicesList {
    position: absolute;
    text-align: right;
    bottom: 102px;
    left: 408px;

    @include respond-width($w-m) {
      bottom: 80px;
      left: 315px;
    }

    @include respond-width($w-s) {
      bottom: 18px;
      left: 51px;
    }
  }
}


</style>
