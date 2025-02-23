<template>
  <div class="works-section">
    <Container>
      <h2 class="heading-1 heading-1-spacing text-align-right">
        <span v-onScrollActivate="{ activeRange: 0.85 }">
          <CanvasText :theme="'light'"> WORK </CanvasText>
        </span>
      </h2>

      <div
        id="gallery"
        ref="projectGalleryRef"
        v-onScrollActivate="{
          trackOnly: true,
          bidirectionalActivation: true,
          // scrollTriggerSectionsClass: navigationStore.projects.galleryOpen
          //   ? 'project-item'
          //   : null,
        }"
      >
        <div v-onScrollActivate="{ fixToParentId: 'gallery' }">
          <div class="gallery-controls">
            <button
              class="gallery-controls-btn close-btn"
              @click="closeGallery()"
            >
              <IconsClose />
            </button>
            <button
              v-if="nextProjectName"
              class="gallery-controls-btn change-project-btn next-item"
              @click="
                navigationStore.openGalleryProject(
                  navigationStore.projects.activeProject.index + 1,
                )
              "
            >
              next: {{ nextProjectName }} 👇
            </button>
            <button
              v-if="prevProjectName"
              class="gallery-controls-btn change-project-btn prev-item"
              @click="
                navigationStore.openGalleryProject(
                  navigationStore.projects.activeProject.index - 1,
                )
              "
            >
              previous: {{ prevProjectName }} 👆
            </button>
          </div>
        </div>

        <div
          v-for="(project, index) in projectsData"
          :key="project.name"
          :ref="projectItemRefs.set"
          class="project-item"
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

const navigationStore = useNavigationStore();

const projects = ref(projectsData);

const projectItemRefs = useTemplateRefsList<HTMLDivElement>();
navigationStore.setProjectRefs(projectItemRefs);

const projectGalleryRef = ref();

const nextProjectName = computed(() => {
  return (
    projects.value[navigationStore.projects.activeProject.index + 1]?.name ??
    null
  );
});
const prevProjectName = computed(() => {
  return (
    projects.value[navigationStore.projects.activeProject.index - 1]?.name ??
    null
  );
});

const openProject = (index: number) => {
  navigationStore.openGalleryProject(index);
};

const closeGallery = () => {
  navigationStore.closeGallery();
};

watch(
  () => projectItemRefs,
  (refs) => {
    console.log('refs', refs);
  },
);
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
  z-index: 10;
}

.gallery-controls-btn {
  position: absolute;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
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
  &.first {
    padding-top: 75px;
  }
}
</style>
