<template>
  <!-- NAVIGATION -->
  <div id="topNavigation" class="body-xs">
    <div id="location">
      <span>Portugal</span>
      <span id="splitter">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span>{{ localTime }}</span>
    </div>

    <div>Folio {{ currentYear }}</div>

    <nav>
      <span>About</span>
      <span>Services</span>
      <span>Work</span>
      <span class="active">Contact me</span>
    </nav>
  </div>
</template>
<script setup>
// const props = defineProps({
//   sectionActive: Boolean,
// });

const currentYear = new Date().getFullYear().toString().slice(-2);

const localTime = ref('');
const timezone = 'Europe/Lisbon';

let intervalId = null;
function updateLisbonTime() {
  localTime.value = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());
}

onMounted(() => {
  updateLisbonTime();
  intervalId = setInterval(updateLisbonTime, 60000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<style lang="scss">
@import '/assets/scss/global/Global';
@import '/assets/scss/components/Navigation';
</style>
