<template>
  <section class="">

    <h1>Projects</h1>

    <div class="projects-wrapper">

      <div class="project">
        <h2>Project 1</h2>
        <p>Project 1 description</p>
        <CanvasImage :typeOfMesh="'project'" :srcLink="'img/screen_1.jpg'" />
      </div>

      <div class="project">
        <h2>Project 2</h2>
        <p>Project 2 description</p>
        <CanvasImage :typeOfMesh="'project'" :srcLink="'img/screen_1.jpg'" />
      </div>

      <div class="project">
        <h2>Project 3</h2>
        <p>Project 3 description</p>
        <CanvasImage :typeOfMesh="'project'" :srcLink="'img/screen_1.jpg'" />
      </div>

    </div>

  </section>
</template>

<script>
export default {
  // components: {
  //   image: () => import('~/components/common/Image.vue')
  // },
  // page properties go here
  //data
  data() {
    return {
      // canvas: null,
    }
  },
  methods: {

  },
  mounted() {

  },

}
</script>

<style>

.project{

}

</style>