<template>
  <div id="appContainer"  >

    <div id="smooth-wrapper"  >
      <div id="smooth-content" ref="page" >

        <CommonHeader />
        <SectionAbout />
        <SectionProjects />
        <SectionContact />
<!--        <NuxtPage/>-->
        <CommonFooter />

      </div>
    </div>

    <div ref="canvas" id="animationContainer"></div>

  </div>

</template>
<script  >

import {Canvas} from "~/utils/canvas";

export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    Canvas.init(this.$refs.canvas, this.$refs.page);
  },
}


</script>

<style>

#animationContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  pointer-events: none;
  z-index: -1;
}

</style>


