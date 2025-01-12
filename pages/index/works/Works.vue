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

      <div id="gallery">
        <div v-if="projectsExpanded">
          <!--          v-scrollSpeed="'gallery'"-->
          <div
            class="change-project-btn next-item"
            @click="goToProject(activeProjectsIndex - 1)"
          >
            previous: {{ prevProjectName }} 👆
          </div>
        </div>
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          ref="projects"
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
        <div v-if="projectsExpanded" v-scrollSpeed="'gallery'">
          <div class="close-icon" @click="expandProjectView(null)">
            <IconsClose />
          </div>
        </div>
        <div >
          <div
            class="change-project-btn next-item"
            @click="goToProject(activeProjectsIndex + 1)"
          >
            next: {{ nextProjectName }} 👇
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import projects from '~/content/projects.json';
import Project from '~/pages/index/works/Project.vue';
import IconsClose from '~/components/common/icons/close.client.vue';
import { useTemplateRef } from 'vue';

const activeProjectsIndex = ref(0);
const projectsExpanded = ref(false);
const nextProjectName = computed(() => {
  return projects[activeProjectsIndex.value + 1]?.name ?? null;
});
const prevProjectName = computed(() => {
  return projects[activeProjectsIndex.value - 1]?.name ?? null;
});

const expandProjectView = (index: number | null) => {
  console.log('expandProjectView - scroll to ', index);
  activeProjectsIndex.value = index === null ? 0 : index;
  projectsExpanded.value = index !== null;
};

const projectRefs = useTemplateRef('projects');

const goToProject = (index: number) => {
  activeProjectsIndex.value = index;
  //get project position
  // const projectPosition = 0;

  console.log('projectRefs.value', projectRefs.value, index);

  // Canvas.scrollTo(projectPosition, 0.5);
};
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/index/works/Works';
</style>
