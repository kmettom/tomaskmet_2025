<template>
  <div class="works-section">
    <Container>
      <h2 class="heading-1">
        <span v-scrollActive="0.65">
          <CanvasText
            :mesh-id="'headline-work'"
            :shader="'default'"
            :theme="'light'"
          >
            WORK
          </CanvasText>
        </span>
      </h2>

      <div id="gallery" ref="projectGalleryRef">
        <div v-if="projectsExpanded" v-scrollSpeed:fixed="'gallery'">
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
            :is-expanded="projectsExpanded"
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
import Project from '~/pages/index/works/Project.vue';
import IconsClose from '~/components/common/icons/close.client.vue';
import { useTemplateRefsList } from '@vueuse/core';
const navigationStore = useNavigationStore();

const projects = ref(projectsData);
const activeProjectsIndex = ref(0);
const projectsExpanded = ref(false);

const projectItemRefs = useTemplateRefsList<HTMLDivElement>();
const projectGalleryRef = ref();

const nextProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value + 1]?.name ?? null;
});
const prevProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value - 1]?.name ?? null;
});

const expandProjectView = (index: number | null) => {
  activeProjectsIndex.value = index === null ? 0 : index;
  projectsExpanded.value = index !== null;
  navigationStore.setNavVisible(index === null);
  if (index !== null) {
    setTimeout(() => {
      if (index) goToProject(index);
    }, 500);
  }
};

const goToProject = (index: number) => {
  activeProjectsIndex.value = index;
  const projectPosition =
    projectItemRefs.value[index].getBoundingClientRect().top + window.scrollY;

  console.log('goToProject', index, projectPosition);

  Canvas.scrollTo(projectPosition, 0.5);
};
</script>

<style lang="scss" scoped>
//=======>>>   WORKS   <<<==========//

$marginRight: 50px;

.works-section {
  padding-top: 200px;
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

h2 {
  text-align: right;
  padding-bottom: 100px;

  @include respond-width($w-s) {
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
  right: -$marginRight;
  width: 50%;
  height: 100vh;
  bottom: 0;
  z-index: 10;
}

.gallery-controls-btn {
  position: absolute;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}
.close-btn {
  top: 25%;
  right: $marginRight;
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
