<template>
  <div class="services-section">
    <Container>
      <h2 class="heading-1 heading-1-spacing">
        <span v-onScrollActivate="{ activeRange: 0.85 }">
          <CanvasText :theme="'dark'"> SERVICES </CanvasText>
        </span>
      </h2>

      <div id="servicesList" class="services-wrapper">
        <div
          v-for="(service, index) in services"
          :key="index"
          v-onScrollActivate="{
            activeRange: 0.75,
            fixToParentId: 'servicesList',
            onScrollCallback: (item: any, speed: any) => {
              setServiceBlockBlur(item.elNode, service.styles);
            },
          }"
          class="service-item"
          :style="serviceBoxStyle(Number(index))"
        >
          <div class="">
            <div class="service-item-inner">
              <Service
                :title="service.title"
                :icon="service.icon"
                :text="service.text"
                :styles="service.styles"
                :block-size="serviceBlockSize"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import services from '~/content/services.model.json';
import Service from '~/pages/index/services/Service.vue';
import gsap from 'gsap';

const serviceBlockSize = 340;
const serviceTopPadding = 50

const setServiceBlockBlur = (elNode: any, styles: any) => {
  const animationCoef = Math.min(1, 1 - ( (elNode.getBoundingClientRect().top - serviceTopPadding) / window.innerHeight));
  const rotateDeg = styles.rotate * animationCoef
  const opacity =  animationCoef;
  const blur = 10 *(1-animationCoef)
  console.log(  animationCoef, styles.rotate);
  gsap.set(elNode,{ filter: `blur(${blur}px)`, opacity: opacity , rotation:rotateDeg})
};

const serviceMarginTop = (indexInRow: number) => {
  return ` margin-top:${ indexInRow * serviceBlockSize}px; `;
};

const servicePaddingTop = (index:number) => {
  let rowIndex = Math.floor(index / 3);
  return ` padding-top: ${ serviceTopPadding  + (rowIndex * serviceBlockSize) / 2}px; `;
}

const serviceBoxStyle = (index: number) => {
  let indexInRow = index;
  if (index > 2) {
    indexInRow = index - 3;
  }
  return `${serviceMarginTop(indexInRow)} ${servicePaddingTop(index)} z-index: ${indexInRow}; translate(0,0);`;
};
</script>

<style lang="scss" scoped>
//=======>>>   SERVICES   <<<==========//
.services-section {
  padding-top: 100px;
  padding-bottom: 275px;
  background-color: var(--light-color);
  color: var(--dark-color);
  text-align: center;

  @include respond-width($w-xs) {
    padding-top: 50px;
    padding-bottom: 50px;

    & h2 {
      margin-bottom: 50px;
    }
  }
}
.services-wrapper {
  position: relative;
}
.service-item {
  display: inline-block;
  vertical-align: top;
  &.active .service-item-inner {
    //transition: all 0.5s ease;
    opacity: 1;
  }
}
.service-item-inner {
  transition: all 0.5s ease;
  opacity: 0;
}
</style>
