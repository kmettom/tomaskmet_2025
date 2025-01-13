<script setup>
// import { watch } from 'vue';
// import { gsap } from 'gsap';
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

const emit = defineEmits(['expandProjects']);

// const expandProject = (status) => {
//   console.log(status);

// const timeline = gsap.timeline();
// timeline.from('.project-image img', {
//   opacity: 0,
//   y: 0,
//   height: '80vh',
//   width: '50vw',
//   duration: 0.5,
//   ease: 'power2.out',
// });

// timeline.from('.client', {
//   opacity: 0,
//   x: -20, // Move it slightly from the left
//   duration: 0.5,
//   ease: 'power2.out',
// }, '-=0.3'); // Overlap slightly using negative delay
// };

// watch props.isExpanded
// watch(
//   () => props.isExpanded,
//   (newValue) => {
//     expandProject(newValue);
//   },
// );
</script>

<template>
  <div
    v-scrollActive:once:top:projectCallback="0.9"
    :class="`project ${props.isExpanded ? 'expanded' : ''}`"
    @mouseover="hoverImage = true"
    @mouseleave="hoverImage = false"
    @click="emit('expandProjects')"
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
    <div class="project-image">
      <CanvasImage
        :shader="'example2'"
        :src-link="props.project.image.src"
        :image-hover="hoverImage"
      />
    </div>
    <div class="info body-m">
      <span>{{ props.project.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/assets/scss/global/Global';
@use '/assets/scss/pages/index/works/Project';
</style>
