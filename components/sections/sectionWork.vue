<template>

  <!-- WORK -->
  <div id="work">
    <Container>
      <h2 class="heading-1">
          <span v-scrollActive="0.65">
            <CanvasText :meshId="'headline-work'" :shader="'default'" :theme="'light'">
              Work
            </CanvasText>
          </span>
      </h2>

      <div id="gallery">
        <div class="nextItem" @click="visitNext">
          next: bright union 👆
        </div>
        <div v-scrollActive="0.8" v-for="(project, index) in projects.projects" @click="() => { projectsExpandedIndex = index;
        projectsExpanded=!projectsExpanded}">
          <Project :isExpanded="projectsExpanded" :project="project" :title="index.toString()"/>
        </div>
        <div class="prevItem" @click="visitPrev">
          previous: african origins 👇
        </div>
      </div>

    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from "@/components/common/container.vue";
import projects from '@/content/projects.json'
import Project from "@/components/common/project.vue";

const projectsExpandedIndex = ref(0)
const projectsExpanded = ref(false)

console.log("projects", projects)

const visitNext = () => {
  console.log('visit next');
};

const visitPrev = () => {
  console.log('visit prev');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style";

</style>
