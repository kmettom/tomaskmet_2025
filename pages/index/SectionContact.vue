<template>
  <div class="contact-section">
    <Container>
      <div class="">
        <div class="contact-line">
          <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText
                :mesh-id="'headline-get'"
                :shader="'default'"
                :theme="'dark'"
              >
                GET
              </CanvasText>
              <span v-scrollActive="0.85" class="canvas-text-spacing">
                <CanvasText
                  :mesh-id="'headline-in'"
                  :shader="'default'"
                  :theme="'dark'"
                >
                  IN
                </CanvasText>
              </span>
            </span>
          </div>
          <div class="side-list action-list body-m">
            <div>
              <span>📞 Book a call</span>
            </div>
            <div>
              <!-- <div class="iconFrame">
                <img :src="LetterIcon" alt="Letter icon">
              </div> -->
              <a
                href="mailto:hello@783studio.com"
                data-email="hello@783studio.com"
              >
                <span>✉️ Send a request</span>
              </a>
            </div>
          </div>
        </div>
        <div class="contact-line align-right">
          <div class="side-list social-media-list body-m">
            <div>
              <a href="https://www.instagram.com/783.studio" target="_blank"
                >Instagram</a
              >
            </div>
            <!--            <div><a href="" target="_blank">Email</a></div>-->
            <div>
              <a
                href="mailto:hello@783studio.com"
                data-email="hello@783studio.com"
                >Email</a
              >
            </div>
            <div>
              <a href="https://www.linkedin.com/in/tomas-kmet/" target="_blank"
                >LinkedIn</a
              >
            </div>
          </div>
          <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText
                :mesh-id="'headline-touch'"
                :shader="'default'"
                :theme="'dark'"
              >
                TOUCH
              </CanvasText>
            </span>
          </div>
        </div>
      </div>
    </Container>
    <div class="basketball-game">
      <div class="basketball-icon-wrapper">
        <img
          class="basketball-icon"
          :src="BasketBallIcon"
          alt="Basket ball icon"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import BasketBallIcon from '~/public/icons/basket-ball.png';
</script>

<style lang="scss" scoped>
//=======>>>   CTA   <<<==========//
.contact-section {
  position: relative;
  color: var(--dark-color);
  background-color: var(--light-color);

  padding-top: 150px;
  padding-bottom: 150px;
}
.canvas-text-spacing {
  padding-left: 20px;
  position: relative;
  display: inline-block;
}

.contact-line {
  display: flex;
  justify-content: start;
  &.align-right {
    justify-content: end;
  }
}

.social-media-list {
}

.side-list {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.basketball-game {
  width: 150px;
  height: 25px;
  background-color: var(--dark-color);
  position: absolute;
  left: 30%;
  bottom: 0;

  @include respond-width($w-s) {
    width: 100px;
  }

  .basketball-icon-wrapper {
    position: absolute;
    left: 75%;
    bottom: 100%;
    transform: translateX(-50%);

    .basketball-icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
