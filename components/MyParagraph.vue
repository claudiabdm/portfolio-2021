<script lang="ts" setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, ref } from 'vue';
import type { MyParagraph } from '~/types/components';

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}


const figureRef = ref<Element>();
const paragraphRef = ref<Element>();
const props = withDefaults(defineProps<{ blok: MyParagraph }>(), {
  blok: () => ({
    isReversed: false,
    showScroll: false,
    figure: undefined
  }) as MyParagraph
})

onMounted(() => {
  if (figureRef.value && props.blok.figure?.[0] != null) {
    createScrollTriggerTl(figureRef.value);
  }
  if (paragraphRef.value) {
    createScrollTriggerTl(paragraphRef.value);
  }
})

function createScrollTriggerTl(target: Element): gsap.core.Timeline {
  gsap.set(target, {
    autoAlpha: 0,
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      end: 'center center',
      scrub: true,
    },
  });
  tl.add(
    gsap.to(target, {
      autoAlpha: 1,
      ease: 'easeInOut',
      duration: 0.5,
    })
  );
  return tl;
}
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'paragraph',
      { 'paragraph--reversed': blok.isReversed },
      { 'paragraph--scroll': blok.showScroll },
    ]"
  >
    <div
      ref="paragraphRef"
      class="paragraph__text"
    >
      <MyRichText
        v-if="blok.text"
        :text="blok.text"
      />
      <MyLink
        v-if="blok.linkText && blok.link?.url"
        :link="blok.link.url"
      >{{
        blok.linkText
      }}</MyLink>
    </div>
    <div
      v-if="blok.figure?.[0] != null"
      ref="figureRef"
      class="paragraph__figure"
    >
      <component
        :is="blok.figure[0].component"
        v-if="blok.figure.length > 0"
        :key="blok.figure[0]._uid"
        :blok="blok.figure[0]"
        :auto-size="false"
      />
    </div>
  </section>
</template>


<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.paragraph {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  padding: 0 25px 25vh;

  &--scroll {
    padding-bottom: 0;
    margin-bottom: 50vh;
    position: relative;

    &::before {
      content: 'SCROLL';
      position: absolute;
      top: 105%;
      color: var(--secondary);
      font-size: 12px;
      font-family: var(--font-family-secondary);
      opacity: 0.75;
      animation: bounce 1.5s infinite alternate-reverse ease-in-out;
    }

    &::after {
      content: '';
      position: absolute;
      top: 112%;
      width: 1px;
      height: 40vh;
      background-color: var(--secondary);
      opacity: 0.75;

      @media screen and (min-width: $max-width) {
        left: 4%;
      }
    }

    .paragraph__text {
      flex-basis: 70%;

      @media screen and (min-width: $max-width) {
        text-align: left;
      }
    }

    .paragraph__figure {
      padding-left: 0;
    }
  }

  &:last-child {
    padding-bottom: var(--nav-height);

    @media screen and (min-width: $max-width) {
      padding-bottom: 25vh;
    }
  }

  @media screen and (min-width: $max-width) {
    flex-direction: row;
  }

  &--reversed {
    @media screen and (min-width: $max-width) {
      flex-direction: row-reverse;

      .paragraph__figure {
        padding-left: 0;
        padding-right: 20%;
      }
    }
  }

  &__text {
    min-width: 100%;
    margin-top: 25px;
    visibility: hidden;

    @media screen and (min-width: $max-width) {
      min-width: auto;
      flex-basis: 50%;
      margin-top: 0;
    }
  }

  &__figure {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 70%;
    transform-box: fill-box;
    padding: 0 5vw;

    @media screen and (min-width: $max-width) {
      flex-basis: 50%;
      padding-right: 0;
      padding-left: 20%;
    }
  }
}

@keyframes bounce {
  from {
    transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 5px, 0);
  }
}
</style>
