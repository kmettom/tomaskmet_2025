<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
  <div id="footer" class="body-xs">
      <span id="rights">
        © {{ new Date().getFullYear() }} Studio 783&nbsp;&nbsp;|&nbsp;&nbsp;All rights reserved
      </span>
    <span id="font">Font: Pangram Pangram<span id="fontSeparator">&nbsp;&nbsp;|&nbsp;&nbsp;</span></span>
    <span id="design">Design: <a href="https://jagodakondratiuk.com" target="_blank">Jagoda Kodnratiuk</a></span>
  </div>
</template>

<script setup lang="ts">
import Container from "~/components/common/Container.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

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
