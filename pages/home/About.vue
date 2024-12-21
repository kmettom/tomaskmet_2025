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
import Container from "~/components/common/Container.vue";
</script>

<style lang="scss" scoped>
@import "assets/scss/style";

//=======>>>   ABOUT   <<<==========//

.aboutSection {
  display: grid;
  grid-template-columns: 10fr 14fr;
  text-transform: uppercase;
  padding-bottom: 200px;

  @include respond-width($w-m-s) {
    padding: 40px;
  }

  @include respond-width($w-xs) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  & p {
    margin-bottom: 30px;

    @include respond-width($w-m) {
      margin-bottom: 10px;
    }

    @include respond-width($w-xs) {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

</style>
