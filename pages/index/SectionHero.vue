<template>
  <div>
    <Container additional-class="hero-section">
      <div class="hero-content-line hero-line-studio">
        <h2 class="heading-0">
          <CanvasText
            :mesh-id="'headline-studio'"
            :shader="'default'"
            :theme="'light'"
          >
            STUDIO
          </CanvasText>
        </h2>
      </div>

      <div class="hero-content-line hero-line-783">
        <div class="body-m hero-content-sm hero-services">
          <p>web3</p>
          <p>creative</p>
          <p>apps</p>
          <p>websites</p>
          <p>e-commerce</p>
        </div>
        <h2 class="heading-1">
          <CanvasText
            :mesh-id="'headline-783'"
            :shader="'default'"
            :theme="'light'"
          >
            783
          </CanvasText>
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
import gsap from 'gsap';

const props = defineProps({
  sectionActivate: Boolean,
});

const heroSectionAnimation = () => {
  gsap.to('.hero-content-sm', { opacity: 1, duration: 0.5, stagger: 0.5 });
};

watch(
  () => props.sectionActivate,
  (newValue) => {
    if (newValue) {
      heroSectionAnimation();
    }
  },
);
</script>

<style lang="scss" scoped>
//=======>>>   HERO   <<<==========//
.hero-section {
  padding: 100px 0;
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
    margin: -55px 0px -135px 0;
  }
  &.hero-line-783 {
    //height: 350px;
  }
}

.hero-content-sm {
  position: absolute;
  padding: 0 20px;
  width: 300px;
  opacity: 0;
  &.hero-services {
    text-align: right;
    left: -300px;
    bottom: 100px;
  }
  &.hero-summary {
    text-align: left;
    right: -300px;
    top: 50px;
  }
}
</style>
