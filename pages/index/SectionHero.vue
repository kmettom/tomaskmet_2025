<template>
  <div id="Hero">
    <Container additional-class="heroSection">
      <h2 id="" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText
            :mesh-id="'headline-studio'"
            :shader="'default'"
            :theme="'light'"
          >
            STUDIO
          </CanvasText>
        </span>
      </h2>
      <h2 id="kmet" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText
            :mesh-id="'headline-783'"
            :shader="'default'"
            :theme="'light'"
          >
            783
          </CanvasText>
        </span>
      </h2>
      <div id="summary" class="body-m">
        <p>Web Developer with</p>
        <p>managerial background,</p>
        <p>coding and bringing a full</p>
        <p>team to help your project.</p>
      </div>
      <div id="servicesList" class="body-m">
        <p>web3</p>
        <p>creative</p>
        <p>apps</p>
        <p>websites</p>
        <p>e-commerce</p>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
</script>

<style lang="scss" scoped>
//=======>>>   HERO   <<<==========//
.heroSection {
  padding-top: 250px;
  height: 600px;
  position: relative;

  //&[data-v-4c47fd49] {
  //  margin-top: 100px;
  //  max-width: 1048px;
  //  margin-bottom: 100px;
  //
  //  @include respond-width($w-m) {
  //    max-width: 780px;
  //    height: 420px;
  //  }
  //
  //  @include respond-width($w-s) {
  //    max-width: 326px;
  //    height: 188px;
  //    margin-top: 0px;
  //    margin-bottom: 100px;
  //  }
  //}

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
