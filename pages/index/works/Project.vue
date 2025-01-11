<script setup>

const props = defineProps({
  project: {
    type: Object,
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
  },
  index: {
    type: Number,
    required: true,
  }
});

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

</script>

<template>
  <div class="project">
    <div
      :style="getCanvasStyles()"
      :class="[props.isExpanded ? ['expandedCanvas', 'canvas'] : 'canvas']"
    >
      <div class="heading-3">{{ props.index }}</div>

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
          {{project.description}}
        </p>

        <a :href="project.websiteLink" target="_blank">👉 visit site</a>
      </div>
      <div class="frame" :style="getImgFrameStyles()">
        <CanvasImage
          :width="`${project.image.width}px`"
          :height="`${project.image.height}px`"
          :shader="'example2'"
          :src-link="props.project.image.src"
        />
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
