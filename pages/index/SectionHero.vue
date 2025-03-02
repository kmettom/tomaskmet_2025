<template>
    <Container additional-class="hero-section">

      <div class="hero-content-line hero-line-tomas">
        <h2 class="heading-1">
          <CanvasText :theme="'light'" :uniforms="mainTextInUniforms">
            TOMAS
          </CanvasText>
        </h2>
      </div>

      <div class="hero-content-line hero-line-kmet">
        <div class="body-m hero-content-sm hero-services">
          <p>web3</p>
          <p>creative</p>
          <p>web apps</p>
          <p>websites</p>
          <p>e-commerce</p>
        </div>
        <h2 class="heading-1">
          <CanvasText :theme="'light'" :uniforms="mainTextInUniforms">
            KMET
          </CanvasText>
        </h2>
        <div class="body-m hero-content-sm hero-summary">
          <p>Web Developer with</p>
          <p>managerial background,</p>
          <p>coding and bringing a full</p>
          <p>team to help your project.</p>
        </div>
      </div>
      <div class="hero-bg-image">
        <CanvasImage
            :src-link="'images/hero.png'" :uniforms="{uHover: { active: false, duration: 0.1 }}"
        />
      </div>
    </Container>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const props = defineProps({
  sectionActivate: Boolean,
});

const mainTextIn = ref(false);
const mainTextInUniforms = computed(() => {
  return { uAniIn: { active: mainTextIn.value, duration: 1 } };
});

const heroSectionAnimation = () => {
  gsap.registerPlugin(SplitText);

  const split = new SplitText('.hero-content-sm', { type: 'words,chars' });
  gsap.from(split.chars, {
    opacity: 0,
    y: 10,
    delay: 0.5,
    duration: 0.2,
    stagger: 0.005,
    onStart: () => {
      gsap.to('.hero-content-sm', { opacity: 1, duration: 0 });
    },
    // onComplete:()=>{
    //   split.revert();
    // }
  });

  mainTextIn.value = true;
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
  &.hero-line-tomas {
    right: 20%;
    //display: block;
  }
  &.hero-line-kmet {
    left: 20%;
    //height: 350px;
  }
}

.hero-content-sm {
  position: absolute;
  padding: 0 20px;
  width: 300px;
  opacity: 0;
  span {
    opacity: 0;
  }
  &.hero-services {
    text-align: right;
    left: -300px;
    bottom: 130px;
  }
  &.hero-summary {
    text-align: left;
    right: -300px;
    top: 50px;
  }
}
.hero-bg-image{
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50%;
  border: 1px solid red;
}
</style>
