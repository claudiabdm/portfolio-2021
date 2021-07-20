<template>
  <section v-editable="blok" class="project">
    <div class="project__group">
      <h3 class="project__title">
        <span class="dot">></span>
        <span :ref="`${blok._uid}-title`"></span
        ><span :ref="`${blok._uid}-cursor`" class="dot">_</span>
      </h3>
      <p class="project__description">
        {{ blok.description }}
      </p>
      <div class="project__links">
        <MyLink
          v-if="blok.demo.url"
          class="project__link"
          :link="blok.demo.url"
          @mouseenter.native="onLinkHover('Play with it')"
        >
          Live
        </MyLink>
        <MyLink
          v-if="blok.code.url"
          class="project__link"
          :link="blok.code.url"
          @mouseenter.native="onLinkHover('Check code')"
        >
          Code
        </MyLink>
      </div>
    </div>
    <div class="project__media">
      <div :ref="`${blok._uid}-window`" class="window">
        <div class="window__header">
          <svg class="window__buttons">
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="12"
              cy="12"
              r="4"
            />
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="28"
              cy="12"
              r="4"
            />
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="44"
              cy="12"
              r="4"
            />
          </svg>
          <span class="window__title">{{ blok.title }}</span>
        </div>
        <MyImage
          class="window__image"
          :blok="{
            image: {
              filename: blok.media.filename,
              alt: blok.media.alt,
            },
            width: 370,
            height: 231.25,
          }"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Project } from '~/types/components';

if (process.client) {
  gsap.registerPlugin(TextPlugin);
}

export default Vue.extend({
  name: 'MyProject',
  props: {
    blok: {
      type: Object as () => Project,
      default: () => ({} as Project),
    },
    animate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      titleTimeline: null as unknown as gsap.core.Timeline,
      titleScrollTimeline: null as unknown as gsap.core.Timeline,
      cursorTimeline: null as unknown as gsap.core.Timeline,
      previousText: '',
      timeout: null as any,
      lastFilter: 'show-all',
      titleObserver: null as unknown as IntersectionObserver,
      windowObserver: null as unknown as IntersectionObserver,
    };
  },
  mounted() {
    const cursorRef = this.$refs[`${this.blok._uid}-cursor`] as Element;
    const titleRef = this.$refs[`${this.blok._uid}-title`] as Element;
    const windowRef = this.$refs[`${this.blok._uid}-window`] as Element;
    this.cursorTimeline = this.createCursorTimeline(cursorRef).pause(0.5);
    this.titleTimeline = this.createTitleTimeline(
      titleRef,
      this.blok.title
    ).pause(0);
    this.titleScrollTimeline = this.createTitleTimeline(
      titleRef,
      this.blok.title
    )
      .pause(0)
      .add(this.cursorTimeline.play(0));
    this.windowObserver = this.$elevateAnimationObserver(windowRef);
    this.titleObserver = this.createTitleObserver(
      titleRef,
      this.titleScrollTimeline
    );
  },
  beforeDestroy() {
    this.titleTimeline.kill();
    this.titleScrollTimeline.kill();
    this.cursorTimeline.kill();
    this.titleObserver.disconnect();
    this.windowObserver.disconnect();
  },
  methods: {
    createTitleObserver(
      target: Element,
      timeline: gsap.core.Timeline
    ): IntersectionObserver {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]): void => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              timeline.restart();
            }
          }
        }
      );
      observer.observe(target);
      return observer;
    },
    createTitleTimeline(titleRef: Element, text: string) {
      const tl = gsap.timeline();
      tl.add(this.textAnimation(titleRef, text));
      return tl;
    },
    createCursorTimeline(cursorRef: Element) {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });
      tl.fromTo(
        cursorRef,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'steps(1)',
        }
      );
      return tl;
    },
    onLinkHover(text: string) {
      if (text === this.previousText) return;
      if (text !== this.blok.title && this.timeout > 0) {
        clearTimeout(this.timeout);
      }
      this.titleScrollTimeline.pause(0);
      this.previousText = text;
      const titleRef = this.$refs[`${this.blok._uid}-title`] as Element;
      this.cursorTimeline.pause(0);
      this.titleTimeline.reverse(this.titleTimeline.time());
      this.titleTimeline.eventCallback('onReverseComplete', () => {
        this.titleTimeline = this.createTitleTimeline(titleRef, text);
        this.titleTimeline.play(0);
        this.titleTimeline.eventCallback('onComplete', () => {
          this.cursorTimeline.restart();
          if (text !== this.blok.title) {
            this.timeout = setTimeout(() => {
              this.onLinkHover(this.blok.title);
            }, 500);
          }
        });
      });
    },
    textAnimation(elem: Element, text: string): gsap.core.Tween {
      return gsap.to(elem, {
        id: 'textAnimation',
        duration: text.length / 16,
        text: {
          value: text,
        },
        ease: 'none',
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.project {
  height: 100%;
  display: grid;
  grid-template-areas: 'media' 'group';
  grid-template-rows: max-content 1fr;
  row-gap: rem(20px);
  align-content: flex-start;

  &__title {
    font-size: $text-3xl;
    font-weight: 700;
    font-family: var(--font-family-secondary);
  }

  &__group {
    @include flex(flex-start, flex-start, column);
    @include size(100%, auto);
    padding: 0;
    grid-area: group;
  }

  &__description,
  &__links {
    padding-left: rem(25px);
  }

  &__links {
    @include flex(center, flex-start);
    margin-top: auto;
    padding-top: rem(10px);
  }

  &__link {
    margin-right: 10%;
  }

  &__media {
    grid-area: media;
    border-radius: $border-radius;
    background-color: var(--shadow);
    margin-left: rem(10px);
  }
}

.window {
  @include size(100%, auto);
  @include flex(flex-start, flex-start, column);
  border: rem(2px) solid var(--stroke);
  border-radius: $border-radius;
  color: var(--shadow);
  background-color: var(--secondary);
  overflow: hidden;

  &__header {
    @include size(100%, auto);
    @include flex(center, flex-start);
    position: relative;
    border-bottom: rem(2px) solid var(--stroke);
    padding: 5px;
  }
  &__buttons {
    @include size(rem(64px), rem(24px));
    position: absolute;
    circle {
      fill: var(--tertiary);
      color: var(--stroke);
    }
  }
  &__title {
    @include size(100%, 100%);
    @include flex(center, center);
    text-align: left;
    font-family: var(--font-family-secondary);
    font-size: rem(14px);
  }

  &__image {
    display: flex;
  }
}

.dot {
  color: var(--tertiary);
}
</style>
