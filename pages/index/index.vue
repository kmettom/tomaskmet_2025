<template>
  <div>
    <div v-trackSection:navigation class="page-section" data-nav-id="home">
      <SectionHero :page-active="pageActive" />
    </div>
    <div v-trackSection:navigation class="page-section" data-nav-id="about">
      <SectionAbout />
    </div>
    <div v-trackSection:navigation class="page-section" data-nav-id="work">
      <SectionWorks />
    </div>
    <div
      v-trackSection:navigation
      class="page-section"
      data-navcontrast="true"
      data-nav-id="services"
    >
      <SectionServices />
    </div>
    <div
      v-trackSection:navigation
      class="page-section"
      data-navcontrast="true"
      data-nav-id="contact"
    >
      <SectionContact />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import SectionWorks from '~/pages/index/works/SectionWorks.vue';
import SectionServices from '~/pages/index/services/SectionServices.vue';
import { onMounted, watch } from 'vue';
import SectionHero from '~/pages/index/SectionHero.vue';
import SectionAbout from '~/pages/index/SectionAbout.vue';
import SectionContact from '~/pages/index/SectionContact.vue';
import Footer from '~/components/common/Footer.vue';

useSeoMeta({
  title: '783Studio - Web design & development',
  ogTitle: '783Studio - Web design & development',
  description: '783Studio - Web design & development',
  ogDescription: '783Studio - Web design & development',
});

const props = defineProps({
  pageActive: Boolean,
});

const pageAniIn = () => {
  console.log('Example method - animate page transition');
};

onMounted(() => {
  if (props.pageActive) {
    pageAniIn();
  }
});

watch(
  () => props.pageActive,
  (newValue) => {
    if (newValue) {
      pageAniIn();
    }
  },
);
</script>

<style lang="scss"></style>
