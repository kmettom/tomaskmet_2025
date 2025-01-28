<template>
  <div>
    <div
      v-onScrollActivate="sectionActivationOptions"
      class="page-section"
      data-nav-id="home"
    >
      <SectionHero :section-activate="props.pageActive" />
    </div>
    <div
      v-onScrollActivate="sectionActivationOptions"
      class="page-section"
      data-nav-id="about"
    >
      <SectionAbout />
    </div>
    <div
      v-onScrollActivate="sectionActivationOptions"
      class="page-section"
      data-nav-id="work"
    >
      <SectionWorks />
    </div>
    <div
      v-onScrollActivate="sectionActivationOptions"
      class="page-section"
      data-navcontrast="true"
      data-nav-id="services"
    >
      <SectionServices />
    </div>
    <div
      v-onScrollActivate="sectionActivationOptions"
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

const sectionActivationOptions = {
  trackOnly: true,
  activateCallback: 'pageSection',
  activeRangeOrigin: 'top',
  // activeRangeMargin: 0,
};
</script>

<style lang="scss"></style>
