<template>

  <span>
    <img ref="img" alt="picture" :src="srcLink" />
  </span>

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
    // addToCanvas() {
    //   Canvas.addImage(this.$refs.img, this.typeOfMesh);
    // }
  },
  mounted() {

    Canvas.addImage(this.$refs.img, this.typeOfMesh);

    // this.addToCanvas();
    // this.$refs.img.addEventListener('load', () => {
    //   this.addToCanvas(this.$refs.img);
    // });
  },

}
</script>

<style>

img{
  opacity: 0;
}

</style>