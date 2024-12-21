<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <div id="callToActionSection">
    <Container>
      <div class="frame">
        <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText :meshId="'headline-get-in'" :shader="'default'" :theme="'dark'">
                Get in
              </CanvasText>
            </span>
        </div>
        <div id="secondPart">
          <div class="heading-1">
              <span v-scrollActive="0.85">
                <CanvasText :meshId="'headline-touch'" :shader="'default'" :theme="'dark'">
                  touch
                </CanvasText>
              </span>
          </div>
          <div id="actionList" class="body-m">
            <div>
              <!-- <div class="iconFrame">
                <img :src="PhoneIcon" alt="Phone icon">
              </div> -->
              <span>📞 Book a call</span>
            </div>
            <div>
              <!-- <div class="iconFrame">
                <img :src="LetterIcon" alt="Letter icon">
              </div> -->
              <a href="mailto:hello@783studio.com">
                <span>✉️ Send a request</span>
              </a>
            </div>
          </div>
          <div id="socialMediaList" class="body-m">
            <div><a href="https://www.instagram.com/kmettom/" target="_blank">Instagram</a></div>
            <div><a href="" target="_blank">Email</a></div>
            <div><a href="https://twitter.com/KmetTom" target="_blank">Twitter</a></div>
            <div><a href="https://www.linkedin.com/in/tomas-kmet/" target="_blank">LinkedIn</a></div>
          </div>
        </div>

      </div>
    </Container>
    <div id="bottomElement">
      <div class="iconFrame">
        <img :src="BasketBallIcon" alt="Basket ball icon">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Container from "@/components/common/container.vue";
import BasketBallIcon from '/icons/basket-ball.png';

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
