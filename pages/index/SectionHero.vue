<template>
  <div>
    <Container additional-class="hero-section">
      <div class="hero-content-line hero-line-studio">
        <h2 class="heading-0">
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
      </div>
      <div class="hero-content-line">
        <div class="body-m hero-content-sm hero-services">
          <p>web3</p>
          <p>creative</p>
          <p>apps</p>
          <p>websites</p>
          <p>e-commerce</p>
        </div>
        <h2 class="heading-1">
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
        <div class="body-m hero-content-sm hero-summary">
          <p>Web Developer with</p>
          <p>managerial background,</p>
          <p>coding and bringing a full</p>
          <p>team to help your project.</p>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
</script>

<style lang="scss" scoped>
//=======>>>   HERO   <<<==========//
.hero-section {
  padding: 100px 0px;
  position: relative;
  text-align: center;
}
.hero-content-line {
  position: relative;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  justify-content: center;
  &.hero-line-studio {
    display: block;
    //margin-bottom: -15px;
  }
}

.hero-content-sm {
  position: absolute;
  padding: 0px 10px;
  width: 300px;
  &.hero-services {
    text-align: right;
    left: -300px;
    bottom: 0;
  }
  &.hero-summary {
    text-align: left;
    right: -300px;
    top: 0;
  }
}
</style>
