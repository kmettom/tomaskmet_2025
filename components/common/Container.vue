<template>
  <div :class="['section-container', additionalClass]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    additionalClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/scss/components/Container';
</style>
