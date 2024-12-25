<template>
  <div id="appContainer">
    <CommonNavigation :page-active="null" />

    <div id="scrollContainer">
      <div id="scrollableContent" ref="scrollableContent">
        <slot />
      </div>
    </div>

    <div id="animationContainer" ref="canvas" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '/assets/scss/components/DefaultPageLayout';
</style>
