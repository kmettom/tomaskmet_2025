<template>
  <!-- NAVIGATION -->
  <div id="topNavigation" class="body-xs">
    <div id="location">
      <span>Portugal</span>
      <span id="splitter">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span>11:35 PM</span>
    </div>

    <div>Folio 24</div>

    <nav>
      <span>About</span>
      <span>Services</span>
      <span>Work</span>
      <span class="active">Contact me</span>
    </nav>
  </div>
<!--  <div class="">-->
<!--    <NuxtLink aria-label="showcase" to="/">-->
<!--      Showcase-->
<!--    </NuxtLink>-->
<!--    <br/>-->
<!--    <NuxtLink aria-label="about" to="/about">-->
<!--      About-->
<!--    </NuxtLink>-->
<!--  </div>-->
</template>
<script setup>
import { onMounted } from "vue";

const props = defineProps({
  pageActive: Boolean
});

onMounted(() => {
});

</script>
<style lang="scss">
@import "assets/scss/style";

//=======>>>   NAVIGATION   <<<==========//

#topNavigation {
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  // site navigation
  & nav {
    display: flex;
    flex-direction: column;
    text-align: right;

    & span {
      cursor: pointer;

      &.active {
        font-weight: bold;

        &::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url('/icons/right-arrow.svg') no-repeat;
          background-size: cover;
          margin-right: 4px;
          position: relative;
          bottom: -4px;
        }
      }
    }
  }

  & #location {
    display: flex;

    @include respond-width($w-xs) {
      flex-direction: column;

      #splitter {
        display: none;
      }
    }
  }
}


</style>
