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
            Work
          </CanvasText>
        </span>
      </h2>

      <div id="gallery" ref="projectGalleryRef" >
        <div v-if="projectsExpanded" class="gallery-controls">
          <button class="close-icon" @click="expandProjectView(null)">
            <IconsClose />
          </button>
          <button
            v-if="projectsExpanded && nextProjectName"
            class="change-project-btn next-item"
            @click="goToProject(activeProjectsIndex + 1)"
          >
            next: {{ nextProjectName }} 👇
          </button>
          <button
            v-if="projectsExpanded && prevProjectName"
            class="change-project-btn prev-item"
            @click="goToProject(activeProjectsIndex - 1)"
          >
            previous: {{ prevProjectName }} 👆
          </button>
        </div>

        <div
          v-for="(project, index) in projectsData"
          :key="project.name"
          :ref="projectItemRefs.set"
          class="project-item"
          :class="`${project?.position?.inline && !projectsExpanded ? 'project-inline' : ''}`"
          :style="
            project?.position?.top && !projectsExpanded
              ? {
                  top: project?.position?.top,
                  paddingBottom: project?.position?.top,
                }
              : ''
          "
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

const projects = ref(projectsData);
const activeProjectsIndex = ref(0);
const projectsExpanded = ref(false);
const nextProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value + 1]?.name ?? null;
});
const prevProjectName = computed(() => {
  return projects.value[activeProjectsIndex.value - 1]?.name ?? null;
});

const expandProjectView = (index: number | null) => {
  activeProjectsIndex.value = index === null ? 0 : index;
  projectsExpanded.value = index !== null;
};
const projectItemRefs = useTemplateRefsList<HTMLDivElement>();
const projectGalleryRef = ref();

const goToProject = (index: number) => {
  activeProjectsIndex.value = index;
  // console.log("projectGalleryRef", projectGalleryRef.value.getBoundingClientRect().top);
  const projectPosition = projectItemRefs.value[index].getBoundingClientRect().bottom ;
  // console.log('projectPosition', index, projectPosition);
  Canvas.scrollTo(projectPosition, 0.5);
};
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/index/works/Works';
</style>
