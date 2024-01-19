<template>
  <div class="wrapper">

    <!-- NAVIGATION -->
    <div id="topNavigation" class="body-xs">
      <div id="location">
        <span>Portugal</span>
        <span id="splitter">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span>11:35 PM</span>
      </div>

      <div>Folio 24</div>

      <nav>
        <span>About</span>
        <span>Services</span>
        <span>Work</span>
        <span class="active">Contact me</span>
      </nav>
    </div>

    <!-- HERO -->
    <Container additionalClass="heroSection">
      <h2 class="heading-1" id="thomas">Thomas</h2>
      <h2 id="kmet" class="heading-1">Kmet</h2>
      <div class="body-m" id="summary">
        Web Developer with <br />
        managerial background, <br />
        coding and bringing a full<br />
        team to help your project.
      </div>
      <div class="body-m" id="servicesList">
        web3<br />
        creative <br />
        apps<br />
        websites<br />
        e-commerce
      </div>
    </Container>

    <!-- ABOUT -->
    <Container id="about" additionalClass="aboutSection">
      <h2 class="body-xs">About</h2>
      <div class="body-l">
        <p>A Self taught developer with managerial background and 8 years of hands on coding experience.</p>
        <p>WORKING WITH AGENCIES, COMPANIES and freelancers using broad spectrum frameworks and backend API's.</p>
        <p>Interested in developing web apps, dapps, websites and e-commerce, happily spending time with Web3 or animating
          with WebGl. Looking forward to learning more. Connected with a broad network to fit the needs of a wide range of
          projects.</p>
        <p>Collaborate with other developers, designers and marketers to shape and create brands, experiences and products
          together.</p>
        <DownloadButton />
      </div>
    </Container>

    <!-- SERVICES -->
    <div id="services">
      <Container>
        <h2 class="heading-1">Services</h2>


        <div class="frame">
          <Service title="Main Title" :icon="GlobeIcon"
            text="Risus vulputate nisl facilisi a in integer. Egestas pulvinar mattis etiam ultrices. Massa eu feugiat id urna auctor donec sed. Sit cursus pretium convallis enim congue dolor. In rhoncus fusce eget diam scelerisque diam est pharetra sem." />
        </div>
      </Container>

    </div>

  </div>
</template>

<script setup>
import Container from "@/components/common/container.vue";
import DownloadButton from "@/components/common/downloadButton.vue";
import Service from "@/components/common/service.vue";
import GlobeIcon from "@/components/icons/globe.client.vue";
import { onMounted, watch } from "vue";

useSeoMeta({
  title: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogTitle: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  description: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
  ogDescription: 'Showcase Nuxt ThreeJS Starter Pack - Tomas Kmet - Web developer',
})

const hoverImage1 = ref(false);
const hoverImage2 = ref(false);

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

//=======>>>   NAVIGATION   <<<==========//

#topNavigation {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  // site navigation
  & nav {
    display: flex;
    flex-direction: column;
    text-align: right;

    & span {
      cursor: pointer;

      &.active {
        font-weight: bold;

        &::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url('public/imgs/right-arrow.svg') no-repeat;
          background-size: cover;
          margin-right: 4px;
          position: relative;
          bottom: -4px;
        }
      }
    }
  }

  & #location {
    display: flex;

    @include respond-width($w-xs) {
      flex-direction: column;

      #splitter {
        display: none;
      }
    }
  }
}

//=======>>>   HERO   <<<==========//
.heroSection {
  // border: 1px solid salmon;
  height: 600px;
  position: relative;

  &[data-v-4c47fd49] {
    margin-top: 100px;
    max-width: 1048px;

    @include respond-width($w-m) {
      max-width: 780px;
      height: 420px;
    }

    @include respond-width($w-s) {
      max-width: 326px;
      height: 188px;
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
  // min-height: 700px;

  & h2 {
    margin-bottom: 150px;
  }

  & .frame {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include respond-width($w-xs) {
    padding-top: 50px;
    padding-bottom: 50px;

    & h2 {
      margin-bottom: 50px;
    }
  }
}





// .inline-example {
//   vertical-align: top;
//   display: inline-block;
//   padding-right: 20px;
// }

// #fixedElContainer {
//   height: 1250px;
//   position: relative;
//   margin-top: 75px;

//   &:before {
//     left: -20px;
//     content: '';
//     position: absolute;
//     height: 100%;
//     width: 2px;
//     background: #1B1818;
//   }
// }

// .scroll-top-btn {
//   text-align: center;
//   margin-top: 70px;
//   cursor: pointer;
//   padding: 35px 0px;
//   text-decoration: underline;
// }
</style>
