<script setup>
import {ref, toRefs} from "vue";
import IconsClose from "~/components/common/icons/close.client.vue";

const props = defineProps({
  project: {
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    // required: true
  }
});

const {
  project,
  title,
  isExpanded,
  isActive,
} = toRefs(props);

const getCanvasStyles = () => {
  return {
    alignSelf: `flex-${props.project?.position?.value}`,
  };
};

const getImgFrameStyles = () => {
  return {
    width: props.project?.image?.width.value,
    height: props.project?.image?.height.value,
  };
};

const emit = defineEmits(['update:isExpanded']);

const toggleDesc = () => {
  emit('update:isExpanded', false);
};

</script>

<template>
  <div :style="getCanvasStyles()" :class="[props.isExpanded ? ['expandedCanvas', 'canvas'] : 'canvas']">
    <div class="heading-3">{{ props.title }}</div>

    <div class="description">
      <div class="statistics">
        <div class="infoRow">
          <div>client:</div>
          <div>{{ props.project.client }}</div>
        </div>
        <div class="infoRow">
          <div>year:</div>
          <div>{{ props.project.year }}</div>
        </div>
        <div v-if="props.project.award" class="infoRow">
          <div>award</div>
          <div>{{ props.project.award }}</div>
        </div>
      </div>


      <p>Nibh tempor egestas magna tristique. Tortor pulvinar ac faucibus pharetra elit nunc. Sapien justo lacus
        varius augue neque consectetur sit. Nulla eget auctor arcu dictum semper quam nulla facilisis. Posuere id
        elit ipsum magna quis blandit ultrices hendrerit fermentum. Nisl consequat non felis neque habitant neque
        egestas quis sed. Scelerisque vel integer ultrices ac erat volutpat. </p>

      <a href="https://example.com" target="_blank">👉 visit site</a>
    </div>
    <div class="frame" :style="getImgFrameStyles()">
      <CanvasImage :shader="'example2'" :src-link="props.project.image.src"/>
    </div>
  </div>
  <div class="info body-m">
    <span>{{ props.project.client }}</span>
    <!--    <span>{{ type }}</span>-->
  </div>
  <div class="closeIcon" @click="toggleDesc">
    <IconsClose/>
  </div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/style";

.halfWidth {
  display: inline-block;
  width: 50%;
}

.halfHeight {
  height: 50%;
}

.canvas {
  display: inline-block;
}

.description {
  display: none;
}

.closeIcon {
  display: none;

  &:hover {
    cursor: pointer;
  }
}

.frame {
  position: relative;

  &:hover {
    cursor: pointer;
  }
}

.canvas.expandedCanvas {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20vh 0;
  transition: ease all 0.3s;

  @include respond-width($w-s) {
    flex-direction: column-reverse;
    align-items: center !important;
    padding: 10vh 0;
    gap: 10vh;
  }

  .heading-3 {
    position: absolute;
    right: 105%;
    align-self: flex-start;


    @include respond-width($w-m-s) {
      top: 5%;
      left: 0;
    }

    @include respond-width($w-s) {
      top: 0;
      left: 10%;
    }

    @include respond-width($w-xs) {
      top: 2%;
      left: 5%;
    }
  }

  .info {
    display: none;
  }

  .description {
    position: relative;
    display: block;
    width: 40%;
    height: 60vh;

    @include respond-width($w-m-s) {
      width: 46%;
    }

    @include respond-width($w-s) {
      width: 80%;
    }

    @include respond-width($w-xs) {
      width: 100%;
    }

    .statistics {
      height: 50%;

      .infoRow {
        height: 20%;

        * {
          display: inline-block;
          width: 50%;
        }
      }
    }

    a {
      display: inline-block;
      margin-top: 20px;
    }


  }

  .frame {
    width: 40% !important;
    position: relative;

    @include respond-width($w-m-s) {
      width: 46% !important;
    }

    @include respond-width($w-s) {
      width: auto !important;
      max-height: 50% !important;
      object-fit: contain;
    }

    // @include respond-width($w-xs) {
    //     width: 100% !important;
    // }

    &:hover {
      cursor: auto;
    }

  }

  .closeIcon {
    display: block;
    position: absolute;
    left: 102%;
    align-self: flex-start;
    border: 1px solid aqua;

    @include respond-width($w-m-s) {
      top: 8%;
      left: 90%;
    }

    @include respond-width($w-s) {
      top: 30px;
      left: 85%;
    }

    @include respond-width($w-xs) {
      top: 3%;
      right: 5%;
    }
  }


}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  display: flex;
  justify-content: space-between;
}
</style>