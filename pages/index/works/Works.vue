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
        <div
          v-if="projectsExpanded && nextProject"
          class="change-project-btn next-item"
          @click="visitNext"
        >
          previous: {{ nextProject }} 👆
        </div>
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          v-scrollActive="0.8"
          :class="`${project.position.inline ? 'project-inline' : ''}`"
          @click="expandProjectView(index)"
        >
          <Project :is-expanded="projectsExpanded" :project="project" :index="index" />
        </div>
        <div
          v-if="projectsExpanded"
          class="close-icon"
          @click="expandProjectView(0)"
        >
          <IconsClose />
        </div>
        <div
          v-if="projectsExpanded && prevProject"
          class="change-project-btn prev-item"
          @click="visitPrev"
        >
          next: {{ nextProject }} 👇
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

const activeProjectsIndex = ref(0);
const projectsExpanded = ref(false);
const nextProject = computed(() => {
  return projects[activeProjectsIndex.value + 1]?.name ?? false;
});
const prevProject = computed(() => {
  return projects[activeProjectsIndex.value - 1]?.name ?? false;
});

const expandProjectView = (index: number) => {
  activeProjectsIndex.value = index;
  projectsExpanded.value = !projectsExpanded.value;
};

const visitNext = () => {
  console.log('visit next');
};

const visitPrev = () => {
  console.log('visit prev');
};
</script>

<style lang="scss" scoped>
@import '/assets/scss/global/Global';
@import '/assets/scss/pages/index/works/Works';
</style>
