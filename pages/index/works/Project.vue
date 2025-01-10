<script setup>
import IconsClose from '~/components/common/icons/close.client.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    // required: true
  },
});

// const {  title } = toRefs(props);

const getCanvasStyles = () => {
  return {
    alignSelf: `flex-${props.project?.position?.value}`,
  };
};

const getImgFrameStyles = () => {
  return {
    width: props.project?.image?.width.value,
    height: props.project?.image?.height.value,
  };
};

const emit = defineEmits(['update:isExpanded']);
</script>

<template>
  <div>
    <div
      :style="getCanvasStyles()"
      :class="[props.isExpanded ? ['expandedCanvas', 'canvas'] : 'canvas']"
    >
      <div class="heading-3">{{ props.title }}</div>

      <div class="description">
        <div class="statistics">
          <div class="infoRow">
            <div>client:</div>
            <div>{{ props.project.client }}</div>
          </div>
          <div class="infoRow">
            <div>year:</div>
            <div>{{ props.project.year }}</div>
          </div>
          <div v-if="props.project.award" class="infoRow">
            <div>award</div>
            <div>{{ props.project.award }}</div>
          </div>
        </div>

        <p>
          Nibh tempor egestas magna tristique. Tortor pulvinar ac faucibus
          pharetra elit nunc. Sapien justo lacus varius augue neque consectetur
          sit. Nulla eget auctor arcu dictum semper quam nulla facilisis.
          Posuere id elit ipsum magna quis blandit ultrices hendrerit fermentum.
          Nisl consequat non felis neque habitant neque egestas quis sed.
          Scelerisque vel integer ultrices ac erat volutpat.
        </p>

        <a href="https://example.com" target="_blank">👉 visit site</a>
      </div>
      <div class="frame" :style="getImgFrameStyles()">
        <CanvasImage :shader="'example2'" :src-link="props.project.image.src" />
      </div>
    </div>
    <div class="info body-m">
      <span>{{ props.project.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/index/works/Project';
</style>
