<template>
  <div class="works-section">
    <Container>
      <h2 class="heading-1 heading-1-spacing text-align-right">
        <span
          v-onScrollActivate="{ activeRange: 0.85 }"
          v-set-data-attrs="{ cursorcolor: 'dark' }"
        >
          <CanvasText :theme="'light'"> WORK </CanvasText>
        </span>
      </h2>

      <div
        id="gallery"
        ref="projectGalleryRef"
        v-onScrollActivate="{
          trackOnly: true,
          bidirectionalActivation: true,
        }"
      >
        <div v-onScrollActivate="{ fixToParentId: 'gallery' }">
          <div
            class="gallery-controls"
            :class="{ active: navigationStore.projects.galleryOpen }"
          >
            <button
              v-set-data-attrs="{
                cursoropacity: 0.7,
                cursorsize: 70,
                cursoricon: '🤏',
              }"
              class="gallery-controls-btn close-btn"
              @click="closeGallery()"
            >
              <IconsClose />
            </button>
            <button
              v-if="nextProjectName"
              v-set-data-attrs="{
                cursoropacity: 0.7,
                cursorsize: 70,
                cursoricon: '👇',
              }"
              class="gallery-controls-btn change-project-btn next-item"
              @click="navigationStore.scrollToProject(activeProjectIndex + 1)"
            >
              next: {{ nextProjectName }} 👇
            </button>
            <button
              v-if="prevProjectName"
              v-set-data-attrs="{
                cursoropacity: 0.7,
                cursorsize: 70,
                cursoricon: '👆',
              }"
              class="gallery-controls-btn change-project-btn prev-item"
              @click="navigationStore.scrollToProject(activeProjectIndex - 1)"
            >
              previous: {{ prevProjectName }} 👆
            </button>
          </div>
        </div>
        <div class="gallery-controls-margin" />
        <div
          v-for="(project, index) in projectsData"
          :key="project.name"
          :ref="projectItemRefs.set"
          class="project-item"
          :style="`padding-top: ${projectMargin}vh`"
          :class="{ first: index === 0 }"
        >
          <Project
            :project="project"
            :index="index"
            @open-gallery="openProject(index)"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import projectsData from '~/content/projects.json';
import Project from '~/pages/index/projects/Project.vue';
import IconsClose from '~/components/common/icons/close.client.vue';
import { useTemplateRefsList } from '@vueuse/core';
import { projectDefaults } from '~/constants/projectDefaults.js';

const navigationStore = useNavigationStore();

const projects = ref(projectsData);

const projectItemRefs = useTemplateRefsList<HTMLDivElement>();
navigationStore.setProjectRefs(projectItemRefs);

const projectGalleryRef = ref();
navigationStore.setGalleryRef(projectGalleryRef);
const activeProjectIndex = computed(() => {
  return navigationStore.projects.activeProject.index ?? 0;
});

const nextProjectName = computed(() => {
  return projects.value[activeProjectIndex.value + 1]?.name ?? null;
});
const prevProjectName = computed(() => {
  return projects.value[activeProjectIndex.value - 1]?.name ?? null;
});

const projectMargin = computed(() => {
  return projectDefaults.margin * 100;
});

const openProject = (index: number) => {
  navigationStore.openGalleryProject(index);
};

const closeGallery = () => {
  navigationStore.closeGallery();
};
</script>

<style lang="scss" scoped>
//=======>>>   WORKS   <<<==========//

$marginRight: 50px;

.works-section {
  padding-bottom: 200px;
  margin: auto $marginRight auto 150px;
  position: relative;

  @include respond-width($w-s) {
    margin: auto $marginRight auto 50px;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  @include respond-width($w-xs) {
    margin: auto 25px auto 25px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

#gallery {
  position: relative;
}

.gallery-controls {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  &.active {
    pointer-events: auto;
  }
}

.gallery-controls-btn {
  position: absolute;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}

.close-btn {
  width: 35px;
  height: 35px;
  background: none;
  outline: none;
  border: none;
  top: 115px;
  right: -35px;
}

.change-project-btn {
  cursor: pointer;
  height: 75px;
  width: 100%;
  color: var(--light-color);
  &.next-item {
    bottom: 0;
  }
  &.prev-item {
    top: 0;
  }
}

.project-item {
  position: relative;
}
</style>
