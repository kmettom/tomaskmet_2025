<template>
  <div class="wrapper">
    <div class=""/>
    <!--   class: bg-image-->
    <!-- HERO -->
    <Container additionalClass="heroSection">
      <h2 class="heading-1" id="">
        <span v-scrollActive="0.85">
          <CanvasText :meshId="'headline-studio'" :shader="'default'" :theme="'light'">
            STUDIO
          </CanvasText>
        </span>
      </h2>
      <h2 id="kmet" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText :meshId="'headline-783'" :shader="'default'" :theme="'light'">
            783
          </CanvasText>
        </span>
      </h2>
      <div class="body-m" id="summary">
        Web Developer with <br/>
        managerial background, <br/>
        coding and bringing a full<br/>
        team to help your project.
      </div>
      <div class="body-m" id="servicesList">
        web3<br/>
        creative <br/>
        apps<br/>
        websites<br/>
        e-commerce
      </div>
    </Container>

    <!-- ABOUT -->
    <Container id="about" additionalClass="aboutSection">
      <h2 class="body-xs">About</h2>
      <div class="body-l">
        <p>A Self taught developer with managerial background and 8 years of hands on coding experience.</p>
        <p>WORKING WITH AGENCIES, COMPANIES and freelancers using broad spectrum frameworks and backend API's.</p>
        <p>Interested in developing web apps, dapps, websites and e-commerce, happily spending time with Web3 or
          animating
          with WebGl. Looking forward to learning more. Connected with a broad network to fit the needs of a wide range
          of
          projects.</p>
        <p>Collaborate with other developers, designers and marketers to shape and create brands, experiences and
          products
          together.</p>
        <!--        <DownloadButton />-->
      </div>
    </Container>

    <!-- SERVICES -->
    <div id="services">
      <Container>
        <h2 class="heading-1">
          <span v-scrollActive="0.85">
          <CanvasText :meshId="'headline-services'" :shader="'default'" :theme="'dark'">
            Services
          </CanvasText>
        </span>
        </h2>

        <div class="frame">
          <Service v-for="(service, index) in services" :key="index" :title="service.title" :icon="service.icon"
                   :text="service.text" :desktopStyles="service.desktopStyles" :tabletStyles="service.tabletStyles"/>
        </div>
      </Container>
    </div>

    <!-- WORK -->
    <div id="work">
      <Container>
        <h2 class="heading-1">
          <span v-scrollActive="0.65">
            <CanvasText :meshId="'headline-work'" :shader="'default'" :theme="'light'">
              Work
            </CanvasText>
          </span>
        </h2>
        <div id="gallery" @click="projectsExpanded=!projectsExpanded">
          <!--          {{ projectsExpanded }}-->

          <!--          <span v-for=""-->
          <span v-scrollActive="0.8" v-for="(project, index) in projects.projects">
                      <Project :isExpanded="projectsExpanded" :project="project" :title="index.toString()"/>
          </span>
          <!--          <span v-scrollActive="0.8">-->

          <!--          <Project :isExpanded="projectsExpanded" title="02" imageSrc="imgPlaceholders/330x388.png"-->
          <!--                   name="African origins" type="Website"-->
          <!--                   position="end"/>-->
          <!--          </span>-->
          <!--          <span v-scrollActive="0.8">-->

          <!--          <Project :isExpanded="projectsExpanded" imgWidth="200px" imgHeight="300px" title="03"-->
          <!--                   imageSrc="imgPlaceholders/1050x600.png"-->
          <!--                   name="Neo sephiri" type="Website"/>-->
          <!--          </span>-->
          <!--          <span v-scrollActive="0.8">-->

          <!--          <Project :isExpanded="projectsExpanded" title="04" imageSrc="imgPlaceholders/510x600.png" name="Bright union"-->
          <!--                   type="SDK" position="end"/>-->
          <!--          </span>-->
          <!--          <span v-scrollActive="0.8">-->

          <!--          <Project :isExpanded="projectsExpanded" title="05" imageSrc="imgPlaceholders/330x388.png" name="Pure goat "-->
          <!--                   type="Website"/>-->
          <!--          </span>-->
          <!--          <span v-scrollActive="0.8">-->

          <!--          <Project :isExpanded="projectsExpanded" title="06" imageSrc="imgPlaceholders/1050x600.png"-->
          <!--                   name="Jagoda Kondratiuk portfolio" type="Website"/>-->
          <!--          </span>-->
        </div>

      </Container>
    </div>

    <!-- CTA -->
    <div id="callToActionSection">
      <Container>
        <div class="frame">
          <div class="heading-1">
            <span v-scrollActive="0.85">
              <CanvasText :meshId="'headline-get-in'" :shader="'default'" :theme="'dark'">
                Get in
              </CanvasText>
            </span>
          </div>
          <div id="secondPart">
            <div class="heading-1">
              <span v-scrollActive="0.85">
                <CanvasText :meshId="'headline-touch'" :shader="'default'" :theme="'dark'">
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

    <!-- FOOTER -->

    <div id="footer" class="body-xs">
      <span id="rights">
        © {{ new Date().getFullYear() }} Studio 783&nbsp;&nbsp;|&nbsp;&nbsp;All rights reserved
      </span>
      <span id="font">Font: Pangram Pangram<span id="fontSeparator">&nbsp;&nbsp;|&nbsp;&nbsp;</span></span>
      <span id="design">Design: <a href="https://jagodakondratiuk.com" target="_blank">Jagoda Kodnratiuk</a></span>
    </div>

  </div>
</template>

<script setup>
import Container from "@/components/common/container.vue";
import DownloadButton from "@/components/common/downloadButton.vue";
import Project from "@/components/common/project.vue";
import Service from "@/components/common/service.vue";
import services from '@/content/services.model.json';
import projects from '@/content/projects.json';
import {onMounted, watch} from "vue";
import BasketBallIcon from '/icons/basket-ball.png';

const {data} = await useAsyncData('index', () => queryContent('/index').findOne())

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
})

const hoverImage1 = ref(false);
const hoverImage2 = ref(false);

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


//=======>>>   HERO   <<<==========//
.heroSection {
  height: 600px;
  position: relative;


  &[data-v-4c47fd49] {
    margin-top: 100px;
    max-width: 1048px;
    margin-bottom: 100px;

    @include respond-width($w-m) {
      max-width: 780px;
      height: 420px;
    }

    @include respond-width($w-s) {
      max-width: 326px;
      height: 188px;
      margin-top: 0px;
      margin-bottom: 100px;
    }
  }

  #kmet {
    position: absolute;
    bottom: 45px;
    right: 0;

    @include respond-width($w-s) {
      bottom: 0px;
    }
  }

  #summary {
    position: absolute;
    top: 160px;
    right: 0;

    @include respond-width($w-m) {
      top: 76px;
    }

    @include respond-width($w-s) {
      top: 174px;
      right: -25px;
    }
  }

  #servicesList {
    position: absolute;
    text-align: right;
    bottom: 102px;
    left: 408px;

    @include respond-width($w-m) {
      bottom: 80px;
      left: 315px;
    }

    @include respond-width($w-s) {
      bottom: 18px;
      left: 51px;
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
