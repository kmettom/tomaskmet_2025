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

const projectElClasses = computed(() => {
  return `project ${props.isActive ? ' active-project ' : ''}  ${navigationStore.projects.expanded ? ' expanded ' : ''} ${props.project.position?.alignRight ? ' project-right ' : ''}`;
});

const projectNumber = computed(() => {
  return '0' + (props.index + 1).toString();
});
const hoverImage = ref(false);
const emit = defineEmits(['expandProjects']);
const aniDuration = 0.3; // 0.3

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
  timeline.to('.project-image', {
    height: '70vh',
    width: '50%',
    duration: aniDuration,
  });
  timeline.to('.project-info-wrapper', {
    duration: aniDuration,
    width: '50%',
    height: '70vh',
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
  timeline.to('.project-image', {
    height: '150px',
    width: '400px',
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

const activateExpandedProject = (isActive) => {
  const tl = gsap.timeline();
  tl.to('.project-info-wrapper', { opacity: 1, duration: 0.3 });
  if (isActive) {
    tl.play();
  } else {
    tl.play().reverse();
  }
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

watch(
  () => props.isActive,
  (newValue) => {
    activateExpandedProject(newValue);
  },
);
</script>

<template>
  <div
    v-onScrollActivate="{
      activeRange: navigationStore.projects.expanded ? 1 : 0.85,
      activateOnce: false,
      activeRangeOrigin: navigationStore.projects.expanded ? 0.5 : 1,
      bidirectionalActivation: navigationStore.projects.expanded,
      activateCallback: () => {
        navigationStore.setActiveProject(props.project.name);
      },
      scrollSpeed: navigationStore.projects.expanded
        ? 0
        : props.project.scrollSpeed,
    }"
    :style="`bottom: ${!navigationStore.projects.expanded ? (project.position?.bottom ?? 0) : 0}px;}`"
    :class="projectElClasses"
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
          <p class="project-description body-m">
            {{ project.description }}
          </p>
          <a :href="project.websiteLink" target="_blank">👉 visit website</a>
        </div>
      </div>

      <div class="project-image">
        <CanvasImage
          :src-link="project.image.src"
          :image-hover="hoverImage"
          :image-show="!navigationStore.projects.expanded"
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
  padding: 0 50px 50px 50px;
  position: relative;

  & > * {
    opacity: 0;
  }

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

.expanded {
  border: 2px solid red;
  &.active-project {
    border: 2px solid green;
  }
  .info {
    opacity: 0.5;
  }
}
</style>
