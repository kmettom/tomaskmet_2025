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
.project {
  display: inline-block;
  height: 1vh;
  width: 1vw;
  transition: ease all 0.5s;
  cursor: pointer;
}

.description {
  display: none;
}

.info {
  display: flex;
  justify-content: space-between;
}

.expanded {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20vh 0;
  transition: ease all 0.3s;

  @include respond-width($w-s) {
    flex-direction: column-reverse;
    align-items: center !important;
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
    display: none;
  }

  .description {
    position: relative;
    display: block;
    width: 40%;
    height: 60vh;

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

      .infoRow {
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

  .frame {
    width: 40% !important;
    position: relative;

    @include respond-width($w-m-s) {
      width: 46% !important;
    }

    @include respond-width($w-s) {
      width: auto !important;
      max-height: 50% !important;
      object-fit: contain;
    }

    // @include respond-width($w-xs) {
    //     width: 100% !important;
    // }

    &:hover {
      cursor: auto;
    }
  }

  .closeIcon {
    display: block;
    position: absolute;
    left: 102%;
    align-self: flex-start;
    border: 1px solid aqua;

    @include respond-width($w-m-s) {
      top: 8%;
      left: 90%;
    }

    @include respond-width($w-s) {
      top: 30px;
      left: 85%;
    }

    @include respond-width($w-xs) {
      top: 3%;
      right: 5%;
    }
  }
}
</style>
