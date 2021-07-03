<template>
  <section
    v-editable="blok"
    :class="['project', { 'project--row-reverse': isReverse }]"
    @mouseenter="onProjectHover(blok._uid)"
  >
    <div class="project__group">
      <h3 class="project__title">
        <span class="dot">> </span>
        <span :ref="blok._uid"></span
        ><span :ref="`${blok._uid}-cursor`" class="dot">_</span>
      </h3>
      <p class="project__description">{{ blok.description }}</p>
      <div class="projects__links">
        <a class="project__link" :href="blok.demo.url">Demo</a>
        <a class="project__link" :href="blok.code.url">Code</a>
      </div>
    </div>
    <div class="project__media window">
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
            cx="32"
            cy="12"
            r="4"
          />
          <circle
            stroke-width="2"
            stroke="currentColor"
            cx="52"
            cy="12"
            r="4"
          />
        </svg>
        <span class="window__title">{{ blok.title }}</span>
      </div>
      <img
        class="window__image"
        :src="blok.media.filename"
        :alt="blok.media.alt"
        width="370"
        height="200"
        srcset=""
      />
      <svg style="width: 0; height: 0">
        <filter id="darken">
          <feColorMatrix
            type="matrix"
            values="0.5 0 0 0 0
              0 0.5 0 0 0
              0 0 0.5 0 0
              0 0 0 1 0 "
          />
        </filter>
      </svg>
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
    isReverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeline: null as unknown as gsap.core.Timeline,
      cursorTimeline: null as unknown as gsap.core.Timeline,
    };
  },
  mounted() {
    const cursorRef = this.$refs[`${this.blok._uid}-cursor`] as Element;
    const projectRef = this.$refs[this.blok._uid] as Element;
    this.cursorTimeline = this.createCursorTimeline(cursorRef);
    this.timeline = this.createTitleTimeline(cursorRef, projectRef);
    this.cursorTimeline.pause(0.5);
    this.timeline.eventCallback('onComplete', () => {
      this.cursorTimeline.play();
    });
  },
  methods: {
    createTitleTimeline(cursorRef: Element, projectRef: Element) {
      const tl = gsap.timeline();
      tl.to(cursorRef, {
        autoAlpha: 1,
      });
      tl.to(projectRef, {
        duration: this.blok.title.length / 8,
        text: {
          value: this.blok.title,
        },
        ease: 'none',
      });
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
    onProjectHover(_uid: string) {
      this.cursorTimeline.pause(0);
      this.timeline.timeScale(2);
      this.timeline.reverse(0);
      this.timeline.eventCallback('onReverseComplete', () => {
        this.timeline.timeScale(1.5);
        this.timeline.play(0);
        this.timeline.eventCallback('onComplete', () => {
          this.cursorTimeline.restart();
        });
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
  row-gap: rem(20px);
  align-items: flex-start;

  &__title {
    font-size: $text-4xl;
    font-weight: 700;
    font-family: var(--font-family-secondary);
  }

  &__group {
    @include size(100%, auto);
    margin-top: auto;
    padding: 0 rem(10px);
    grid-area: group;
  }

  &__media {
    grid-area: media;
  }
}

.window {
  @include size(100%, 100%);
  @include flex(flex-start, flex-start, column);
  border: rem(2px) solid var(--stroke);
  border-radius: $border-radius;
  background-color: var(--secondary);
  box-shadow: $box-shadow;
  overflow: hidden;

  &__header {
    @include size(100%, auto);
    @include flex(center, flex-start);
    border-bottom: rem(2px) solid var(--stroke);
    padding: 5px;
  }
  &__buttons {
    @include size(rem(64px), rem(24px));
    circle {
      fill: var(--tertiary);
      color: var(--stroke);
    }
  }
  &__title {
    @include size(auto, 100%);
    margin-left: 32%;
    margin-right: auto;
    color: var(--shadow);
    font-family: var(--font-family-secondary);
    font-size: rem(14px);
  }
  &__image {
    @include size(100%, 100%);
    object-fit: cover;
    object-position: left;
  }
}

.dark-scheme {
  img {
    filter: url(#darken);
  }
}
.dot {
  color: var(--tertiary);
}
</style>
