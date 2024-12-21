<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <div id="Hero">
    <Container additionalClass="heroSection">
      <h2 class="heading-1" id="">
        <span v-scrollActive="0.85">
          <CanvasText :meshId="'headline-studio'" :shader="'default'" :theme="'light'">
            STUDIO
          </CanvasText>
        </span>
      </h2>
      <h2 id="kmet" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText :meshId="'headline-783'" :shader="'default'" :theme="'light'">
            783
          </CanvasText>
        </span>
      </h2>
      <div class="body-m" id="summary">
        Web Developer with <br/>
        managerial background, <br/>
        coding and bringing a full<br/>
        team to help your project.
      </div>
      <div class="body-m" id="servicesList">
        web3<br/>
        creative <br/>
        apps<br/>
        websites<br/>
        e-commerce
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from "~/components/common/Container.vue";
</script>

<style lang="scss" scoped>
@import "assets/scss/style";

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
