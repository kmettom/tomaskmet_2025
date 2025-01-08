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
        <Service
          v-for="(service, index) in services"
          :key="index"
          :title="service.title"
          :icon="service.icon"
          :text="service.text"
          :desktop-styles="service.desktopStyles"
          :tablet-styles="service.tabletStyles"
        />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import services from '~/content/services.model.json';
import Service from '~/pages/home/services/Service.vue';
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/home/services/Services';
</style>
