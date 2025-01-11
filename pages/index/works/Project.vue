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
  },
});

const projectNumber = computed(() => {
  return '0' + (props.index + 1).toString();
});
const hoverImage = ref(false);

const emit = defineEmits(['expand']);
</script>

<template>
  <div
    :class="`project ${props.isExpanded ? 'expanded' : ''}`"
    @mouseover="hoverImage = true"
    @mouseleave="hoverImage = false"
    @click="emit('expand')"
  >
    <div class="heading-3">{{ projectNumber }}</div>
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
        {{ project.description }}
      </p>

      <a :href="project.websiteLink" target="_blank">👉 visit site</a>
    </div>
    <CanvasImage
      :width="`${project.image.width}px`"
      :height="`${project.image.height}px`"
      :shader="'example2'"
      :src-link="props.project.image.src"
      :image-hover="hoverImage"
    />
    <div class="info body-m">
      <span>{{ props.project.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/index/works/Project';
</style>
