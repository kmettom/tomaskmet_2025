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
            activeRange: 0.85,
            fixToParentId: 'servicesList',
            onScrollCallback: () => {},
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

const serviceBlockSize = 340;

const serviceMarginTop = (indexInRow: number, serviceBlockSize: number) => {
  return `margin-top:${(indexInRow * serviceBlockSize) / 2}px;`;
};

const serviceBoxStyle = (index: number) => {
  let indexInRow = index;
  if (index > 2) {
    indexInRow = index - 3;
  }
  let styles = `${serviceMarginTop(indexInRow, serviceBlockSize)} z-index: ${indexInRow}; transform: translate(0,0);`;
  if (indexInRow !== index) styles += `padding-top: ${serviceBlockSize / 4}px`;
  return styles;
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
