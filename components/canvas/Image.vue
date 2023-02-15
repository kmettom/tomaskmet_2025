<template>

  <span>
    {{srcLink}}
    <img :src="srcLink"  />
  </span>

</template>

<script>

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
    addToCanvas() {
      console.log('add to canvas' , this.srcLink)
    }
  },
  mounted() {
    this.addToCanvas();
  },

}
</script>

<style>
</style>