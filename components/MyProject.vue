<template>
  <section
    v-editable="blok"
    :class="['project', { 'project--row-reverse': isReverse }]"
  >
    <div class="project__group">
      <h3 class="project__title" @mouseenter="onHover(blok.title)">
        <span class="dot">></span>
        <span :ref="blok._uid"></span
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
          @mouseenter.native="onHover('Play with it')"
        >
          Live
        </MyLink>
        <MyLink
          v-if="blok.code.url"
          class="project__link"
          :link="blok.code.url"
          @mouseenter.native="onHover('Check code')"
        >
          Code
        </MyLink>
      </div>
    </div>
    <div class="project__media window" @mouseenter="onHover(blok.title)">
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
            values="0.75 0 0 0 0
              0 0.75 0 0 0
              0 0 0.75 0 0
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
      titleTimeline: null as unknown as gsap.core.Timeline,
      cursorTimeline: null as unknown as gsap.core.Timeline,
      previousText: '',
      timeout: null as any,
    };
  },
  mounted() {
    const cursorRef = this.$refs[`${this.blok._uid}-cursor`] as Element;
    const projectRef = this.$refs[this.blok._uid] as Element;
    this.cursorTimeline = this.createCursorTimeline(cursorRef);
    this.titleTimeline = this.createTitleTimeline(projectRef, this.blok.title);
    this.cursorTimeline.pause(0.5);
    this.titleTimeline.eventCallback('onComplete', () => {
      this.cursorTimeline.play();
    });
  },
  methods: {
    createTitleTimeline(projectRef: Element, text: string) {
      const tl = gsap.timeline();
      tl.to(projectRef, {
        duration: text.length / 8,
        text: {
          value: text,
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
    onHover(text: string) {
      if (text === this.previousText) return;
      if (text !== this.blok.title && this.timeout > 0) {
        clearTimeout(this.timeout);
      }
      this.previousText = text;
      const projectRef = this.$refs[this.blok._uid] as Element;
      this.cursorTimeline.pause(0);
      this.titleTimeline.timeScale(3);
      this.titleTimeline.reverse(this.titleTimeline.time());
      this.titleTimeline.eventCallback('onReverseComplete', () => {
        this.titleTimeline = this.createTitleTimeline(projectRef, text);
        this.titleTimeline.timeScale(3);
        this.titleTimeline.play(0);
        this.titleTimeline.eventCallback('onComplete', () => {
          this.cursorTimeline.restart();
          if (text !== this.blok.title) {
            this.timeout = setTimeout(() => {
              this.onHover(this.blok.title);
            }, 500);
          }
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
  grid-template-rows: 1fr 0.5fr;
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
    margin-top: rem(10px);
  }

  &__link {
    margin-right: 10%;
  }

  &__media {
    grid-area: media;
  }
}

.window {
  @include size(100%, auto);
  @include flex(flex-start, flex-start, column);
  border: rem(2px) solid var(--stroke);
  border-radius: $border-radius;
  color: var(--shadow);
  background-color: var(--secondary);
  box-shadow: $box-shadow;
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
