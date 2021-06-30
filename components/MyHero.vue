<template>
  <section class="hero">
    <SvgCorner class="hero__corner" />
    <div class="hero__group">
      <SvgPoints class="hero__points" />
      <MyRichText class="hero__text" :blok="blok.text" />
      <MyButtonList
        class="hero__buttons"
        :buttons="blok.buttonList[0].buttons"
      />
    </div>
    <MyHeroFigure class="hero__figure" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    blok: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.hero {
  @include flex(flex-start, center, column);
  @include size(100%, 100%);
  min-height: calc(100vh - (#{$header-height} + #{$nav-height}));
  position: relative;
  margin-top: auto;
  color: var(--primary);

  @media screen and (min-width: 1024px) {
    height: calc(100vh - (#{$header-height}));
    max-width: $max-width;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
  }

  &__group {
    padding: 0 rem(25px);
    position: relative;
    @media screen and (min-width: 1024px) {
      @include flex(flex-start, space-between, column);
      @include size(100%, auto);
      padding: auto;
    }
  }

  &__points {
    display: none;
    @media screen and (min-width: 1024px) {
      @include size(100%, 100%);
      @include absolute(-60px, auto, auto, -55px);
      display: block;
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
    }
  }

  &__text {
    position: relative;
    font-family: var(--font-family);
    z-index: 1;
  }
  &__buttons {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
      margin-top: 40px;
    }
  }
  &__figure {
    @include size(100%, 100%);
    z-index: 1;
  }

  &__corner {
    display: none;
    @media screen and (min-width: 1024px) {
      display: block;
      @include size(100%, 100%);
      @include absolute(20px, 20px, auto, auto);
      max-height: rem(50px);
      max-width: rem(50px);
      color: var(--tertiary);
      z-index: 0;
      max-height: rem(100px);
      max-width: rem(100px);
    }
  }
}
</style>
