<template>
  <div id="work">
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
        <div class="nextItem" @click="visitNext">next: bright union 👆</div>
        <div
          v-for="(project, index) in projects.projects"
          v-bind:key="project.client"
          v-scrollActive="0.8"
          @click="expandProjectView(index)"
        >
          <Project
            :is-expanded="projectsExpanded"
            :project="project"
            :title="index.toString()"
          />
        </div>
        <div class="prevItem" @click="visitPrev">
          previous: african origins 👇
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '~/components/common/Container.vue';
import projects from '~/content/projects.json';
import Project from '~/pages/home/works/Project.vue';

const projectsExpandedIndex = ref(0);
const projectsExpanded = ref(false);

const expandProjectView = (index: number) => {
  projectsExpandedIndex.value = index;
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
@import '/assets/scss/pages/home/works/Works';
</style>
