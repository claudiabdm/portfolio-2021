<template>
  <section
    v-editable="blok"
    :class="['paragraph', { 'paragraph--reversed': blok.isReversed }]"
  >
    <div :ref="blok._uid" class="paragraph__text">
      <MyRichText :text="blok.text" />
      <MyLink v-if="blok.linkText && blok.link.url" :link="blok.link.url">{{
        blok.linkText
      }}</MyLink>
    </div>
    <div :ref="blok.figure[0]._uid" class="paragraph__figure">
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

<script lang="ts">
import Vue from 'vue';
import { Paragraph } from '@/types/components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default Vue.extend({
  name: 'MyParagraph',
  props: {
    blok: {
      type: Object as () => Paragraph,
      default: () => ({} as Paragraph),
    },
  },
  mounted() {
    const paragraph = this.$refs[this.blok._uid] as Element;
    const figure = this.$refs[this.blok.figure[0]._uid] as Element;
    this.createScrollTriggerTl(paragraph);
    this.createScrollTriggerTl(figure);
  },
  methods: {
    createScrollTriggerTl(target: Element): gsap.core.Timeline {
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
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.paragraph {
  @include flex(center, flex-start, column-reverse);
  padding: 0 rem(25px);
  margin-bottom: 25vh;
  &:first-child {
    margin-bottom: 50vh;
    position: relative;
    &::before {
      content: 'SCROLL';
      position: absolute;
      top: 110%;
      color: var(--secondary);
      font-size: rem(12px);
      font-weight: 300;
      font-family: var(--font-family-secondary);
      opacity: 1;
      animation: bounce 1s infinite alternate-reverse ease-in-out;
    }
    &::after {
      content: '';
      position: absolute;
      top: 120%;
      width: rem(1px);
      height: 35vh;
      background-color: var(--secondary);
      opacity: 0.75;
    }
    .paragraph__text {
      flex-basis: 70%;
      @media screen and (min-width: 1024px) {
        text-align: left;
      }
    }
    .paragraph__figure {
      padding-left: 0;
    }
  }
  &:last-child {
    margin-bottom: $nav-height;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    &:last-child {
      margin-bottom: 25vh;
    }
  }
  &--reversed {
    @media screen and (min-width: 1024px) {
      flex-direction: row-reverse;
      .paragraph__figure {
        padding-left: 0;
        padding-right: 20%;
      }
    }
  }
  &__text {
    margin-top: rem(25px);
    visibility: hidden;
    @media screen and (min-width: 1024px) {
      flex-basis: 50%;
      margin-top: 0;
    }
  }
  &__figure {
    @include size(70%, 70%);
    @include flex(center, center);
    transform-box: fill-box;
    padding: 0 5vw;
    @media screen and (min-width: 1024px) {
      flex-basis: 50%;
      padding-right: 0;
      padding-left: 20%;
    }
  }
}

@keyframes bounce {
  from {
    transform: translate3d(0, rem(-5px), 0);
  }
  to {
    transform: translate3d(0, rem(5px), 0);
  }
}
</style>