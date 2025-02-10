<script setup>
import { watch } from 'vue';
import { gsap } from 'gsap';
const navigationStore = useNavigationStore();

const props = defineProps({
  project: {
    type: Object,
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
const aniDuration = 1;

const expandProject = () => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
      navigationStore.setProjectsInTransition(false);
    },
  });
  timeline.to('.project-name', {
    duration: 0.3,
    opacity: 0,
  });
  timeline.to('.project-image img', {
    height: '80vh',
    width: '50vw',
    duration: aniDuration,
  });
  timeline.to('.project-info-wrapper', {
    duration: aniDuration,
    width: '50vw',
    height: '100%',
  });
  timeline.to('.expand-description > * ', {
    duration: aniDuration,
    opacity: 1,
    stagger: 0.1,
  });
};

const shrinkProject = () => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
      navigationStore.setProjectsInTransition(false);
    },
  });
  timeline.to('.project-image img', {
    height: '200px',
    width: '200px',
    duration: aniDuration,
  });
  timeline.to('.expand-description > * ', {
    duration: aniDuration,
    opacity: 0,
    stagger: 0.1,
  });
  timeline.to('.project-info-wrapper', {
    duration: aniDuration,
    height: 0,
    width: 0,
  });
  timeline.to('.project-name', {
    duration: aniDuration,
    opacity: 1,
  });
};

watch(
  () => navigationStore.projects.expanded,
  (newValue) => {
    if (newValue) {
      navigationStore.setProjectsInTransition(true);
      expandProject();
    } else {
      navigationStore.setProjectsInTransition(true);
      shrinkProject();
    }
  },
);
</script>

<template>
  <div
    v-onScrollActivate="{
      activeRange: 0.85,
      activateOnce: false,
      scrollSpeed: navigationStore.projects.expanded ? 0 : project.scrollSpeed,
    }"
    :style="`bottom: ${!navigationStore.projects.expanded ? (project.position?.bottom ?? 0) : 0}px;}`"
    :class="`project ${navigationStore.projects.expanded ? ' expanded ' : ''} ${project.position?.alignRight ? ' project-right ' : ''}`"
  >
    <div
      :class="`project-wrapper ${project.position?.alignRight ? ' project-right ' : ''}`"
      @mouseover="hoverImage = !navigationStore.projects.expanded"
      @mouseleave="hoverImage = false"
      @click="emit('expandProjects')"
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
          <p>
            {{ project.description }}
          </p>
          <a :href="project.websiteLink" target="_blank">👉 visit website</a>
        </div>
      </div>

      <div class="project-image">
        <CanvasImage
          :shader="'example2'"
          :src-link="project.image.src"
          :image-hover="hoverImage"
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
  margin-bottom: $nameSize;
  position: relative;
  &.project-right {
    justify-content: right;
  }
}
.project-wrapper {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: left;
  &.project-right {
    justify-content: right;
  }
}

.project-index {
  position: absolute;
  left: -75px;
}

.project-image {
  display: inline-block;
}

.project-info-wrapper {
  display: inline-block;
  width: 0;
  height: 0;
  position: relative;
}

.expand-description {
  position: relative;

  & > * {
    opacity: 0;
  }

  .statistics {
    height: 50%;

    .info-row {
      height: 20%;

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

.expanded {
  .info {
    opacity: 0.5;
  }
}
</style>
