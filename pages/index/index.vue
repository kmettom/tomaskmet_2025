<template>
  <div>
    <div
      v-onScrollActivate="setSectionActivationOptions('home', false)"
      class="page-section"
      data-nav-id="home"
    >
      <SectionHero :section-activate="props.pageActive" />
    </div>
    <div
      v-onScrollActivate="setSectionActivationOptions('about', false)"
      class="page-section"
      data-nav-id="about"
    >
      <SectionAbout />
    </div>
    <div
      v-onScrollActivate="setSectionActivationOptions('work', false)"
      class="page-section"
      data-nav-id="work"
    >
      <SectionProjects />
    </div>
    <div
      v-onScrollActivate="setSectionActivationOptions('services', true)"
      class="page-section"
      data-nav-id="services"
    >
      <SectionServices />
    </div>
    <div
      v-onScrollActivate="setSectionActivationOptions('contact', true)"
      class="page-section"
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
import SectionProjects from '~/pages/index/projects/SectionProjects.vue';
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

const navigationStore = useNavigationStore();

const props = defineProps({
  pageActive: Boolean,
});

const setSectionActivationOptions = (sectionId, sectionContrast) => {
  return {
    trackOnly: true,
    activateCallback: (activeState) => {
      // if (activeState) {
        navigationStore.setActiveNavItem(sectionId);
        navigationStore.setNavContrast(sectionContrast);
      // }
    },
    activeRangeOrigin: 'top',
    bidirectionalActivation: true,
    activeRangeMargin: 100,
  };
};
</script>

<style lang="scss"></style>
