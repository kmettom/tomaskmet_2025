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

      <div class="frame">
        <div id="servicesList">
          <div
            v-scrollSpeed:fixed="'servicesList'"
            v-for="(service, index) in services"
            :key="index"
          >
            <Service
              :title="service.title"
              :icon="service.icon"
              :text="service.text"
              :desktop-styles="service.desktopStyles"
              :tablet-styles="service.tabletStyles"
            />
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
</script>

<style lang="scss" scoped>
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
</style>
