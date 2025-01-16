<script setup>
import { watch } from 'vue';
import { gsap } from 'gsap';

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
// const projectEl = ref('projectEl');
const emit = defineEmits(['expandProjects']);
const aniDuration = 1;

const expandProject = () => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
    },
  });
  // timeline.to(
  //     '.project',
  //     {
  //       height: '80vh',
  //       width: '100%',
  //       duration: aniDuration,
  //       ease: 'power2.out',
  //     }, "imgExpand"
  // );
  timeline.to('.project-name', {
    duration: 0.3,
    opacity: 0,
    onComplete: function () {
      gsap.set('.project-name', { display: 'none' });
    },
  });
  timeline.to('.expand-description', {
    duration: aniDuration,
    opacity: 1,
    width: '40%',
  });
  timeline.to('.expand-description > * ', {
    duration: aniDuration,
    opacity: 1,
    stagger: 0.1,
  });
  timeline.to('.project-image img', {
    height: '80%',
    width: '50vw',
    duration: aniDuration,
  });
};

const shrinkProject = () => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
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
  timeline.to('.expand-description', {
    duration: aniDuration,

    width: '0',
    opacity: 0,
  });
  timeline.to('.project-name', {
    duration: aniDuration,
    opacity: 1,
    onStart: function () {
      gsap.set('.project-name', { display: 'block' });
    },
  });
};

watch(
  () => props.isExpanded,
  (newValue) => {
    if (newValue) {
      expandProject();
    } else {
      shrinkProject();
    }
  },
);
</script>

<template>
  <div
    v-scrollActive:once:top:projectCallback="0.9"
    :class="`project ${isExpanded ? 'expanded' : ''}`"
    @mouseover="hoverImage = !isExpanded"
    @mouseleave="hoverImage = false"
    @click="emit('expandProjects')"
  >
    <div class="heading-3">{{ projectNumber }}</div>
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
</template>

<style lang="scss" scoped>
.project {
  display: inline-block;
  transition: ease all 0.5s;
  cursor: pointer;
  position: relative;
  border: 1px solid green;
}

.expand-description {
  opacity: 0;
  width: 0;
  //height: 10;
  overflow: hidden;
  position: relative;
  display: block;

  & > * {
    opacity: 0;
  }

  @include respond-width($w-m-s) {
    width: 46%;
  }

  @include respond-width($w-s) {
    width: 80%;
  }

  @include respond-width($w-xs) {
    width: 100%;
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
  width: 100%;
}

.expanded {
  .info {
    border: 1px solid red;
    opacity: 0.5;
  }

  .frame {
    width: 40%;
    position: relative;

    @include respond-width($w-m-s) {
      width: 46%;
    }

    @include respond-width($w-s) {
      width: auto;
      max-height: 50%;
      object-fit: contain;
    }

    &:hover {
      cursor: auto;
    }
  }
}
</style>
