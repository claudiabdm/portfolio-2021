<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js';
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import type { MyPage } from '~/types/components';

defineProps<{ blok: MyPage }>();

const pageRef = ref<Element>();
const pageTitleRef = ref<Element>();
const pageGroupRef = ref<Element>();

onMounted(() => {
  if (pageRef.value && pageGroupRef.value) {
    animatePage(pageRef.value, pageGroupRef.value, pageTitleRef.value);
  }
})

function animatePage(page: Element, pageGroup: Element, pageTitle?: Element) {
  const tl = gsap.timeline({
    defaults: { ease: 'ease.in', duration: 0.5 },
  });
  if (window.innerWidth > 1024) {
    if (pageTitle) {
      tl.set(pageTitle, {
        autoAlpha: 0,
        yPercent: 50,
      });
    }
    tl.from(page, {
      autoAlpha: 0,
    });
    if (pageTitle) {
      tl.to(pageTitle, {
        autoAlpha: 1,
        yPercent: 0,
      });
    }
    if (pageGroup) {
      tl.from(pageGroup, {
        autoAlpha: 0,
      });
    }
  } else {
    tl.from(page, {
      autoAlpha: 0,
    });
    tl.from(pageGroup, {
      autoAlpha: 0,
    });
  }
}
</script>

<template>
  <section
    v-editable="blok"
    ref="pageRef"
    class="page"
  >
    <h1
      v-if="blok.title"
      ref="pageTitleRef"
      class="page__title"
    >{{ blok.title }}<span class="dot">.</span>
    </h1>
    <div
      ref="pageGroupRef"
      class="page__group"
    >
      <StoryblokComponent
        v-for="blokComponent in blok.body"
        :key="blokComponent._uid"
        :blok="blokComponent as SbBlokData"
      />
    </div>
  </section>
</template>


<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;
@use "sass:math";

.page {
  position: relative;
  padding-bottom: var(--nav-height);
  height: 100%;
  color: var(--primary);
  visibility: hidden;

  @media screen and (min-width: $max-width) {
    padding-top: 50px;
  }

  &__title {
    display: none;
    pointer-events: none;

    @media screen and (min-width: $max-width) {
      display: block;
      position: relative;
      padding: 0 25px;
      font-size: var(--font-6xl);
      font-weight: 700;
      font-family: var(--font-family-secondary);
      text-transform: capitalize;
      z-index: 2;
      visibility: hidden;
    }
  }

  &__group {
    height: 100%;
    margin-top: var(--space-l);
    visibility: hidden;
  }

  &__component {
    margin-top: 25px;
  }

}
</style>
