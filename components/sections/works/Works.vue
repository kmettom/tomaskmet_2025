<!--TODO: extended version - to use scroll, block normal scroll, only scroll by action, debounce and trigger scroll move - add this feature to Canvas scroll -->
<template>
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
import Container from "~/components/common/Container.vue";
import projects from '~/content/projects.json'
import Project from "~/components/sections/works/Project.vue";

const projectsExpandedIndex = ref(0)
const projectsExpanded = ref(false)

const visitNext = () => {
  console.log('visit next');
};

const visitPrev = () => {
  console.log('visit prev');
};
</script>

<style lang="scss" scoped>
@import "assets/scss/style";


//=======>>>   WORK   <<<==========//

#work {
  padding-top: 200px;
  padding-bottom: 200px;
  margin: auto 10%;

  @include respond-width($w-s) {
    margin: auto 5%;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  @include respond-width($w-xs) {
    padding-top: 50px;
    padding-bottom: 50px;
  }


  & h2 {
    text-align: right;
    padding-bottom: 100px;

    @include respond-width($w-s) {
      padding-bottom: 50px;
    }
  }

  & #gallery {
    display: flex;
    flex-direction: column;
    gap: 150px;

    @include respond-width($w-xs) {
      gap: 50px;
    }

    .nextItem {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%, 0);
      width: max-content;
      cursor: pointer;
    }

    .prevItem {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translate(-50%, 0);
      width: max-content;
      cursor: pointer;
    }

    & #firstLine {
      display: flex;
      justify-content: space-between;
      height: 850px;
      flex-direction: row;
      gap: 50px;

      @include respond-width($w-m-s) {
        flex-direction: column;
        height: auto;
        gap: 150px;
      }

      @include respond-width($w-xs) {
        gap: 50px;
      }
    }
  }
}

</style>
