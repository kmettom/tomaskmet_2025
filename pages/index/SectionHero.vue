<template>
  <div>
    <Container additional-class="hero-section">
      <div class="hero-content-line">
        <h2 class="heading-1">
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
        <div class="body-m hero-content-sm hero-summary">
          <p>Web Developer with</p>
          <p>managerial background,</p>
          <p>coding and bringing a full</p>
          <p>team to help your project.</p>
        </div>
      </div>
      <div class="hero-content-line align-right">
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
  padding-top: 100px;
  position: relative;
}
.hero-content-line {
  display: flex;
  align-content: end;

  &.align-right {
    justify-content: end;
  }
}

.hero-content-sm {
  padding: 0px 20px;
}
</style>
