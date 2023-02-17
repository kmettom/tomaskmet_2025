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
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addToCanvas(_img) {
      Canvas.addImage(_img);
    }
  },
  mounted() {
    this.addToCanvas(this.$refs.img);
    // this.$refs.img.addEventListener('load', () => {
    //   this.addToCanvas(this.$refs.img);
    // });
  },

}
</script>

<style>
</style>