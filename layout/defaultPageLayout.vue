
<template>

<div id="appContainer">

<CommonNavigation :page-active="null"/>

<div id="scrollContainer">
  <div id="scrollableContent" ref="scrollableContent">

    <slot></slot>

  </div>
</div>

<div id="animationContainer" ref="canvas"/>

</div>
  </template>


<script setup lang="ts">
import {Canvas} from "~/utils/canvas";
</script>