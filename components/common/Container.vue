<template>
    <div :class="['main', additionalClass]">
        <slot></slot>
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
.main {
    max-width: 1048px;
    margin: 0 auto;
}
</style>
  