<template>
  <div>
    <Container additional-class="hero-section">
      <div class="hero-content-line hero-line-studio">
        <h2 v-scrollActive="0.85" class="heading-0">
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
        <transition name="text" mode="out-in">
          <div v-if="showTexts" class="body-m hero-content-sm hero-services">
            <p>web3</p>
            <p>creative</p>
            <p>apps</p>
            <p>websites</p>
            <p>e-commerce</p>
          </div>
        </transition>
        <h2 v-scrollActive="0.85" class="heading-1">
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

definePageMeta({
  layoutTransition: {
    name: 'text',
    mode: 'out-in',
    onBeforeEnter: (el) => {
      console.log('onBeforeEnter enter...', el);
    },
    onEnter: (el, done) => {
      console.log('onEnter enter...', el, done);
    },
    onAfterEnter: (el) => {
      console.log('onAfterEnter enter...', el);
    },
  },
});

const showTexts = ref(false);
onMounted(() => {
  showTexts.value = true;
});
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
    margin: -55px 0px -135px 0;
  }
  &.hero-line-783 {
    //height: 350px;
  }
}

.hero-content-sm {
  position: absolute;
  padding: 0px 20px;
  width: 300px;
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
