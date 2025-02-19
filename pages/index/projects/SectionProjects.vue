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
          scrollTriggerSectionsClass: navigationStore.projects.expanded
            ? 'project-item'
            : null,
        }"
      >
        <!--        v-onTriggerSectionSlide="{-->
        <!--        scrollTriggerSectionsClass: navigationStore.projects.expanded ? 'project-item' : null,-->
        <!--        }"-->
        <div
          v-if="navigationStore.projects.expanded"
          v-onScrollActivate="{ fixToParentId: 'gallery' }"
        >
          <div class="gallery-controls">
            <button
              class="gallery-controls-btn close-btn"
              @click="expandProjectView(null)"
            >
              <IconsClose />
            </button>
            <button
              v-if="nextProjectName"
              class="gallery-controls-btn change-project-btn next-item"
              @click="goToProject(activeProjectsIndex + 1)"
            >
              next: {{ nextProjectName }} 👇
            </button>
            <button
              v-if="prevProjectName"
              class="gallery-controls-btn change-project-btn prev-item"
              @click="goToProject(activeProjectsIndex - 1)"
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
        >
          <Project
            :project="project"
            :index="index"
            @expand-projects="expandProjectView(index)"
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
const activeProjectsIndex = computed(() => {
  return projects.value.findIndex(
    (project) => project.name === navigationStore.projects.activeProject,
  );
});

const projectItemRefs = useTemplateRefsList<HTMLDivElement>();
const projectGalleryRef = ref();

// const getProjectByName = (projectName) => {
//   let project = null;
//   for (let i = 0; i < projects.value.length; i++) {
//     if (projects.value[i].name === projectName) {
//       project = projects.value[i];
//       break; // Exit the loop once the project is found
//     }
//   }
//   return project;
// };

const nextProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value + 1]?.name ?? null;
});
const prevProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value - 1]?.name ?? null;
});

const expandProjectView = (index: number | null) => {
  navigationStore.setProjectsExpanded(index !== null);
  navigationStore.setNavVisible(index === null);
  if (index !== null) {
    setTimeout(() => {
      if (index) goToProject(index);
    }, 500);
  }
};

const goToProject = (index: number) => {
  const projectPosition =
    projectItemRefs.value[index].getBoundingClientRect().top + window.scrollY;
  Canvas.scrollTo(projectPosition, 0.5);
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
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

#gallery {
  position: relative;
  //position: absolute;
}

.gallery-controls {
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  bottom: 0;
  z-index: 10;
}

.gallery-controls-btn {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
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
  top: 35px;
  right: 0px;
}

.change-project-btn {
  cursor: pointer;
  height: 100px;
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
