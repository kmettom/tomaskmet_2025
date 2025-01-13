<template>
  <div id="footer" class="body-xs">
    <span id="rights">
      © {{ new Date().getFullYear() }} Studio 783&nbsp;&nbsp;|&nbsp;&nbsp;All
      rights reserved
    </span>
    <span id="font"
      >Font: Pangram Pangram<span id="fontSeparator"
        >&nbsp;&nbsp;|&nbsp;&nbsp;</span
      ></span
    >
    <span id="design"
      >Design:
      <a href="https://jagodakondratiuk.com" target="_blank"
        >Jagoda Kodnratiuk</a
      ></span
    >
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use 'assets/scss/global/Global';
@use 'assets/scss/components/Footer';
</style>
