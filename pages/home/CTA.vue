<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <div id="callToActionSection">
    <Container>
      <div class="frame">
        <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText :mesh-id="'headline-get-in'" :shader="'default'" :theme="'dark'">
                Get in
              </CanvasText>
            </span>
        </div>
        <div id="secondPart">
          <div class="heading-1">
              <span v-scrollActive="0.85">
                <CanvasText :mesh-id="'headline-touch'" :shader="'default'" :theme="'dark'">
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
import Container from "~/components/common/Container.vue";
import BasketBallIcon from '~/public/icons/basket-ball.png';

</script>

<style lang="scss" scoped>
@import "assets/scss/style";

//=======>>>   CTA   <<<==========//
#callToActionSection {
  position: relative;
  color: var(--dark-color);
  background-color: var(--light-color);

  padding-top: 150px;
  padding-bottom: 150px;

  & .frame {
    display: flex;
    flex-direction: column;

    @include respond-width($w-m) {
      margin: 0 auto;
      max-width: 598px;
      height: 420px;
    }

    @include respond-width($w-s) {
      max-width: 300px;
      height: 188px;
    }

    & #secondPart {
      position: relative;
      align-self: flex-end;
      bottom: 40px;

      @include respond-width($w-m) {
        bottom: 24px;
      }

      @include respond-width($w-s) {
        bottom: 10px;
      }

      & #actionList {
        position: absolute;
        right: 0;
        bottom: 100%;
        padding-right: 240px;
        padding-bottom: 18px;

        @include respond-width($w-m) {
          padding-right: 21px;
          padding-bottom: 14px;
        }

        @include respond-width($w-s) {
          right: calc(100% + 4px);
          width: 100px;
          bottom: 0;
          height: 100%;
          padding: 0;

          // first option
          & > div:first-child {
            margin-bottom: 15px;

            // first option icon
            & .iconFrame {
              position: relative;
              left: 10px;
            }
          }
        }
      }

      & #socialMediaList {
        position: absolute;
        text-align: right;
        bottom: 50px;
        right: 100%;
        padding-bottom: 5px;
        padding-right: 10px;

        @include respond-width($w-m) {
          bottom: 36px;
          padding-bottom: 0px;
          padding-right: 10px;
        }

        @include respond-width($w-s) {
          text-align: left;
          left: 5px;
          top: calc(100% - 10px);
        }
      }
    }

    & .heading-1 {
      white-space: nowrap;
    }
  }

  // single action item
  & #actionList > div {
    display: flex;

    @include respond-width($w-s) {
      text-align: right;
    }

    & .iconFrame {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4px;
    }
  }

  & #bottomElement {
    width: 150px;
    height: 25px;
    background-color: var(--dark-color);
    position: absolute;
    left: 30%;
    bottom: 0;

    @include respond-width($w-s) {
      width: 100px;
    }

    & .iconFrame {
      position: absolute;
      left: 75%;
      bottom: 100%;
      transform: translateX(-50%);

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}


</style>
