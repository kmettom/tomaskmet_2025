<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <div id="Hero">
    <Container additional-class="heroSection">
      <h2 id="" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText
            :mesh-id="'headline-studio'"
            :shader="'default'"
            :theme="'light'"
          >
            STUDIO
          </CanvasText>
        </span>
      </h2>
      <h2 id="kmet" class="heading-1">
        <span v-scrollActive="0.85">
          <CanvasText
            :mesh-id="'headline-783'"
            :shader="'default'"
            :theme="'light'"
          >
            783
          </CanvasText>
        </span>
      </h2>
      <div id="summary" class="body-m">
        Web Developer with <br />
        managerial background, <br />
        coding and bringing a full<br />
        team to help your project.
      </div>
      <div id="servicesList" class="body-m">
        web3<br />
        creative <br />
        apps<br />
        websites<br />
        e-commerce
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/home/Hero';
</style>
