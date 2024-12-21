<template>
  <div class="wrapper">
    <Hero></Hero>
    <About></About>
    <Services></Services>
    <CTA></CTA>
    <Work/>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Container from "@/components/common/container.vue";
import Work from "~/components/sections/Works.vue";
import DownloadButton from "@/components/common/downloadButton.vue";
import Services from "@/components/sections/Services.vue";
import services from '@/content/services.model.json';
import {onMounted, watch} from "vue";
import Hero from "~/components/sections/Hero.vue";
import About from "~/components/sections/About.vue";
import CTA from "~/components/sections/CTA.vue";
import Footer from "~/components/sections/Footer.vue";

const {data} = await useAsyncData('index', () => queryContent('/index').findOne())

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
})

const hoverImage1 = ref(false);
const hoverImage2 = ref(false);

const projectsExpandedIndex = ref(0);
const projectsExpanded = ref(false);

const props = defineProps({
  pageActive: Boolean
});

const pageAniIn = () => {
  console.log('Example method - animate page transition')
};


onMounted(() => {
  if (props.pageActive) {
    pageAniIn();
  }
});

watch(
    () => props.pageActive,
    (newValue, oldValue) => {
      if (newValue) {
        pageAniIn();
      }
    }
);


</script>

<style lang="scss">
@import "assets/scss/style";

//=======>>>   WRAPPER background image   <<<==========//
.wrapper {
  position: relative;

  .bg-image {
    //position: absolute;
    //top: 0;
    //left: 0;
    //width: 100%;
    //height: 100%;
    //background: url('/tomas-photo.jpg') no-repeat;
    //background-size: 780px;
    //filter: blur(10px);
    //z-index: -1;
    //opacity: 0.8;

    @include respond-width($w-m) {
      background-size: 630px;
    }

    @include respond-width($w-s) {
      background-size: 380px;
    }

    @include respond-width($w-xs) {
      background-size: 260px;
    }
  }
}

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

//=======>>>   SERVICES   <<<==========//
#services {
  padding-top: 150px;
  padding-bottom: 150px;
  background-color: var(--light-color);
  color: var(--dark-color);
  text-align: center;

  & h2 {
    // margin-bottom: 150px;
  }

  & .frame {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    position: relative;

    height: 700px;

    @include respond-width($w-s) {
      height: 1400px;

    }
  }

  @include respond-width($w-xs) {
    padding-top: 50px;
    padding-bottom: 50px;

    & h2 {
      margin-bottom: 50px;
    }
  }
}


//=======>>>   WORK   <<<==========//

#work {
  padding-top: 200px;
  padding-bottom: 200px;
  margin: auto 10%;

  @include respond-width($w-s) {
    margin: auto 5%;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  @include respond-width($w-xs) {
    padding-top: 50px;
    padding-bottom: 50px;
  }


  & h2 {
    text-align: right;
    padding-bottom: 100px;

    @include respond-width($w-s) {
      padding-bottom: 50px;
    }
  }

  & #gallery {
    display: flex;
    flex-direction: column;
    gap: 150px;

    @include respond-width($w-xs) {
      gap: 50px;
    }

    .nextItem {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%, 0);
      width: max-content;
      cursor: pointer;
    }

    .prevItem {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translate(-50%, 0);
      width: max-content;
      cursor: pointer;
    }

    & #firstLine {
      display: flex;
      justify-content: space-between;
      height: 850px;
      flex-direction: row;
      gap: 50px;

      @include respond-width($w-m-s) {
        flex-direction: column;
        height: auto;
        gap: 150px;
      }

      @include respond-width($w-xs) {
        gap: 50px;
      }
    }
  }
}

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

//=======>>>   FOOTER   <<<==========//

#footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  @include respond-width($w-s) {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  & #fontSeparator {
    display: none;
  }

  @include respond-width($w-s) {
    display: block;
    text-align: center;

    & #rights {
      display: block;
    }

    & #fontSeparator {
      display: inline;
    }
  }
}
</style>
