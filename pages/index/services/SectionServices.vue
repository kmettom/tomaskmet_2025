<template>
  <div id="services">
    <Container>
      <h2 class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText
            :mesh-id="'headline-services'"
            :shader="'default'"
            :theme="'dark'"
          >
            Services
          </CanvasText>
        </span>
      </h2>

      <div id="servicesList" class="services-wrapper">
        <div
          v-for="(service, index) in services"
          :key="index"
          v-scrollSpeed:fixed="'servicesList'"
          v-scrollActive:top="0.85"
          class="service-block"
          :style="serviceBoxStyle(Number(index))"
        >
          <Service
            :title="service.title"
            :icon="service.icon"
            :text="service.text"
            :styles="service.styles"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import services from '~/content/services.model.json';
import Service from '~/pages/index/services/Service.vue';

const serviceBoxStyle = (index: number) => {
  let styles = `margin-top:${index * 25}vh; z-index: ${index}; transform: translate(0,0);`;
  if (index > 2) styles += `padding-top: 100px;`;
  return styles;
};
</script>

<style lang="scss" scoped>
//=======>>>   SERVICES   <<<==========//
#services {
  padding-top: 150px;
  padding-bottom: 150px;
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
.service-block {
  display: inline-block;
  vertical-align: top;
}
</style>
