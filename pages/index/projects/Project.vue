<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
const navigationStore = useNavigationStore();

gsap.registerPlugin(SplitText);

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const projectElClasses = computed(() => {
  return `project ${navigationStore.projects.galleryOpen ? (isActive.value ? ' active-project ' : ' expanded-project ') : ''}  ${props.project.position?.alignRight ? ' project-right ' : ''}`;
});

const isActive = computed(() => {
  return navigationStore.projects.activeProjectIndex === props.index;
});

const projectNumber = computed(() => {
  return '0' + (props.index + 1).toString();
});
const hoverImage = ref(false);
const emit = defineEmits(['openGallery']);
</script>

<template>
  <div
    v-onScrollActivate="{
      activeRange: navigationStore.projects.galleryOpen ? 1 : 0.85,
      activateOnce: false,
      activeRangeOrigin: navigationStore.projects.galleryOpen ? 0.5 : 1,
      bidirectionalActivation: navigationStore.projects.galleryOpen,
      activateCallback: () => {
        if (navigationStore.projects.galleryOpen)
          navigationStore.setActiveProject(
            props.index,
            navigationStore.projects.projectItemRefs[index],
          );
      },
      // scrollSpeed: navigationStore.projects.galleryOpen
      //   ? 0
      //   : props.project.scrollSpeed,
    }"
    :style="`bottom: ${!navigationStore.projects.galleryOpen ? (project.position?.bottom ?? 0) : 0}px;}`"
    :class="projectElClasses"
  >
    <div
      :class="`project-wrapper ${project.position?.alignRight ? ' project-right ' : ''}`"
      @mouseover="hoverImage = !navigationStore.projects.galleryOpen"
      @mouseleave="hoverImage = false"
      @click="emit('openGallery')"
    >
      <div class="project-info-wrapper">
        <div class="heading-3 project-index">{{ projectNumber }}</div>
        <div class="expand-description">
          <div class="statistics">
            <div class="info-row">
              <div>client:</div>
              <div>{{ project.name }}</div>
            </div>
            <div class="info-row">
              <div>year:</div>
              <div>{{ project.year }}</div>
            </div>
            <div v-if="project.award" class="info-row">
              <div>award</div>
              <div>{{ project.award }}</div>
            </div>
          </div>
          <p class="project-description body-m">
            {{ project.description }}
          </p>
          <a class="project-link" :href="project.websiteLink" target="_blank"
            >👉 visit website</a
          >
        </div>
      </div>

      <div class="project-image">
        <CanvasImage
          :src-link="project.image.src"
          :image-hover="hoverImage"
          :image-show="!navigationStore.projects.galleryOpen"
        />
      </div>
      <div class="project-name body-m">
        <span>{{ project.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$nameSize: 30px;
.project {
  display: flex;
  justify-content: left;
  margin-top: $nameSize;
  padding-top: $nameSize;
  position: relative;
  &.project-right {
    justify-content: right;
  }
}
.project-wrapper {
  cursor: pointer;
  position: relative;
  display: flex;
  //justify-content: left;
  //&.project-right {
  //  justify-content: right;
  //}
}

.project-index {
  position: absolute;
  left: -75px;
}

.project-image {
  display: inline-block;
  position: relative;
  * {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.project-info-wrapper {
  display: inline-block;
  width: 0;
  height: 0;
  position: relative;
}

.project-description {
  margin-top: 75px;
}

.expand-description {
  opacity: 0;
  padding: 0 50px 50px 50px;
  position: relative;

  //& > * {
  //  opacity: 0;
  //}

  .statistics {
    height: 50%;

    .info-row {
      * {
        display: inline-block;
        width: 50%;
      }
    }
  }

  a {
    display: inline-block;
    margin-top: 20px;
  }
}

.project-name {
  display: inline-block;
  position: absolute;
  bottom: -$nameSize;
  left: 0;
}
</style>
