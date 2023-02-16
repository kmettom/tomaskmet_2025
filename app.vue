<template>
  <div>

    <div id="smooth-wrapper">
      <div id="smooth-content">

        <CommonHeader />
        <NuxtPage/>
        <CommonFooter />

      </div>
    </div>

  </div>

</template>
<script setup>

import {Canvas} from "~/utils/canvas";

// Canvas.init();

console.log(Canvas);


</script>
