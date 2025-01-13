<template>
  <div id="callToActionSection">
    <Container>
      <div class="frame">
        <div class="heading-1">
          <span v-scrollActive="0.85">
            <CanvasText
              :mesh-id="'headline-get'"
              :shader="'default'"
              :theme="'dark'"
            >
              Get
            </CanvasText>
            <span class="canvas-text-spacing">
              <CanvasText
                :mesh-id="'headline-in'"
                :shader="'default'"
                :theme="'dark'"
              >
                in
              </CanvasText>
            </span>
          </span>
        </div>
        <div id="secondPart">
          <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText
                :mesh-id="'headline-touch'"
                :shader="'default'"
                :theme="'dark'"
              >
                touch
              </CanvasText>
            </span>
          </div>
          <div id="actionList" class="body-m">
            <div>
              <!--               <div class="iconFrame">-->
              <!--                <img :src="PhoneIcon" alt="Phone icon">-->
              <!--              </div> -->
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
            <div>
              <a href="https://www.instagram.com/kmettom/" target="_blank"
                >Instagram</a
              >
            </div>
            <div><a href="" target="_blank">Email</a></div>
            <div>
              <a href="https://twitter.com/KmetTom" target="_blank">Twitter</a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/tomas-kmet/" target="_blank"
                >LinkedIn</a
              >
            </div>
          </div>
        </div>
      </div>
    </Container>
    <div id="bottomElement">
      <div class="iconFrame">
        <img :src="BasketBallIcon" alt="Basket ball icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import BasketBallIcon from '~/public/icons/basket-ball.png';
</script>

<style lang="scss" scoped>
@use 'assets/scss/global/Global';
@use 'assets/scss/pages/index/CTA';
</style>
