<template>
  <Container id="about" additional-class="aboutSection">
    <h2 class="body-xs">About</h2>
    <div class="body-l">
      <p
        v-onScrollActivate="{
          activeRange: 0.85,
          activateOnce: true,
          activateCallback: textAniCallback,
        }"
        class="about-1"
        data-about-id="about-1"
      >
        A Self taught developer with managerial background and 8 years of hands
        on coding experience.
        <br />
        WORKING WITH AGENCIES, COMPANIES and freelancers using broad spectrum
        frameworks and backend API's.
      </p>
      <p
        v-onScrollActivate="{
          activeRange: 0.85,
          activateOnce: true,
          activateCallback: textAniCallback,
        }"
        class="about-2"
        data-about-id="about-2"
      >
        Interested in developing web apps, dapps, websites and e-commerce,
        happily spending time with Web3 or animating with WebGl. Looking forward
        to learning more. Connected with a broad network to fit the needs of a
        wide range of projects.
        <br />
        Collaborate with other developers, designers and marketers to shape and
        create brands, experiences and products together.
      </p>

      <!--        <DownloadButton />-->
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function textAniCallback(activeState: string, item: any) {
  if (!activeState) return;
  const tl = gsap.timeline();
  const chars = new SplitText(`.${item.elNode.dataset.aboutId}`, {
    type: 'words,chars',
  }).chars;
  // gsap.set('.welcome-txt-main', { perspective: 400 });
  tl.fromTo(
    chars,
    { y: '10px', opacity: 0 },
    {
      duration: 0.15,
      opacity: 1,
      y: '0px',
      stagger: 0.005,
    },
  );
}
// const textAniCallback = (textSelector: string, activeState: boolean) => {
// };
</script>

<style lang="scss" scoped>
//=======>>>   ABOUT   <<<==========//

.aboutSection {
  display: grid;
  grid-template-columns: 10fr 14fr;
  text-transform: uppercase;
  padding-bottom: 200px;

  @include respond-width($w-m-s) {
    padding: 40px;
  }

  @include respond-width($w-xs) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  & p {
    margin-bottom: 30px;

    @include respond-width($w-m) {
      margin-bottom: 10px;
    }

    @include respond-width($w-xs) {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
