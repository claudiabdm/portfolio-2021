<template>
  <article ref="post" class="post">
    <h1 ref="postTitle" class="post__title">
      {{ blok.content.title }}<span class="dot">.</span>
    </h1>
    <div class="post__meta">
      <MyDate
        class="post__date"
        :date="blok.published_at"
        :text="$t('lastUpdated')"
      />
      <MyTimeToRead :text="blok.content.longText.content" />
    </div>

    <p class="post__intro">
      {{ blok.content.intro }}
    </p>
    <hr class="post__break" />
    <MyRichText class="post__text" :text="blok.content.longText" />
    <SvgPoints class="post__points" />
    <SvgCorner class="post__corner" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';
import { MyPostBlok } from '~/types/components';

export default Vue.extend({
  name: 'MyPost',
  props: {
    blok: {
      type: Object as () => MyPostBlok,
      default: () => {},
    },
  },
  mounted() {
    this.animatePage();
  },
  methods: {
    animatePage(): void {
      if (!process.client) return;
      const post = this.$refs.post as Element;
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      });
      if (window.innerWidth > 1024) {
        tl.from(post, {
          autoAlpha: 0,
        });
      } else {
        tl.from(post, {
          autoAlpha: 0,
          duration: 0.5,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.post {
  @include size(100%, 100%);
  position: relative;
  padding: rem($nav-height) 10vw;
  color: var(--primary);
  visibility: hidden;

  @media screen and (min-width: 1024px) {
    padding-top: rem(50px);
  }

  &__title {
    display: block;
    position: relative;
    font-size: $text-5xl;
    font-weight: 700;
    font-family: var(--font-family-secondary);
    line-height: 1.25;
    z-index: 1;
  }

  &__meta {
    display: flex;
    gap: 16px;
  }

  &__meta,
  &__intro,
  &__text,
  &__break {
    margin-top: rem(25px);
  }

  &__summary {
    font-weight: bold;
    font-style: normal;
  }

  &__intro {
    font-style: italic;
  }

  &__break {
    border: none;
    box-shadow: 0 0 0 1px var(--secondary);
  }

  &__text {
    margin-bottom: rem(50px);
  }

  &__points {
    display: none;

    @media screen and (min-width: 1024px) {
      @include size(100%, 100%);
      @include absolute(0, auto, auto, rem(-55px));
      display: block;
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
      z-index: 0;
    }
  }

  &__corner {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
      @include size(100%, 100%);
      @include absolute(rem(50px), rem(20px), auto, auto);
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
      z-index: 0;
    }
  }
}

.dot {
  color: var(--tertiary);
}
</style>
