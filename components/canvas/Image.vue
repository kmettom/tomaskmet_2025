<template>
  <img ref="img" alt="picture" :src="srcLink" />
</template>

<script>

import {Canvas} from "~/utils/canvas";

export default {
  props: {
    srcLink: {
      type: String,
      required: true
    },
    typeOfMesh: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
  },
  mounted() {
    Canvas.addImage(this.$refs.img, this.typeOfMesh);
  },

}
</script>

<style lang="scss" >

img{
  /*position: relative;*/
  /*width: 100%;*/
  opacity: 0;
}

</style>