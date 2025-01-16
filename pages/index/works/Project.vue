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

const emit = defineEmits(['expandProjects']);

const expandProject = () => {
  const timeline = gsap.timeline({
    onStart: () => {
      Canvas.animateImageMesh = true;
    },
    onComplete: () => {
      Canvas.animateImageMesh = false;
    },
  });
  const aniDuration = 0.75;
  timeline.to(
    '.project-image img',
    {
      height: '80%',
      width: '50vw',
      duration: aniDuration,
      ease: 'power2.out',
      onStart: () => {
        Canvas.animateImageMesh = true;
      },
      onComplete: () => {
        Canvas.animateImageMesh = false;
      },
    },
    'expandProject',
  );
  timeline.to(
    '.project-name',
    {
      duration: aniDuration,
      width: '0%',
      opacity: 0,
    },
    'expandProject',
  );
  timeline.to(
    '.expand-description',
    {
      duration: aniDuration,
      width: '40%',
      height: '80vh',
      opacity: 1,
    },
    'expandProject',
  );
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
  timeline.to(
    '.project-image img',
    {
      height: '100px',
      width: '100px',
      duration: 0.75,
      ease: 'power2.out',
    },
    'shrinkProject',
  );
  timeline.to(
    '.project-name',
    {
      width: '100%',
      opacity: 0,
    },
    'shrinkProject',
  );
  timeline.to(
    '.expand-description',
    {
      width: '0',
      height: '0',
      opacity: 0,
    },
    'shrinkProject',
  );
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
  border: 1px solid green;

  &.expanded{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.expand-description {
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
  position: relative;
  display: block;

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
  //display: flex;
  //justify-content: space-between;
}

.expanded {

  @include respond-width($w-s) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 10vh 0;
    gap: 10vh;
  }

  .heading-3 {
    position: absolute;
    right: 105%;
    align-self: flex-start;

    @include respond-width($w-m-s) {
      top: 5%;
      left: 0;
    }

    @include respond-width($w-s) {
      top: 0;
      left: 10%;
    }

    @include respond-width($w-xs) {
      top: 2%;
      left: 5%;
    }
  }

  .info {
    border: 1px solid red;
    opacity: 0.5;
    //display: none;
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
