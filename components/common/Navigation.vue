<template>
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
  <!--  <div class="">-->
  <!--    <NuxtLink aria-label="showcase" to="/">-->
  <!--      Showcase-->
  <!--    </NuxtLink>-->
  <!--    <br/>-->
  <!--    <NuxtLink aria-label="about" to="/about">-->
  <!--      About-->
  <!--    </NuxtLink>-->
  <!--  </div>-->
</template>
<script setup>
import { onMounted } from 'vue';

// const props = defineProps({
//   // sectionActive: Boolean,
// });

onMounted(() => {});
</script>
<style lang="scss">
@import '/assets/scss/global/Global';
@import '/assets/scss/components/Navigation';
</style>
