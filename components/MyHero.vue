<template>
  <section class="hero">
    <MyRichText class="hero__text" :blok="blok.text" />
    <MyButtonList class="hero__buttons" :buttons="blok.buttonList[0].buttons" />
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
  height: calc(100vh - (#{$header-height} + #{$nav-height} + 20px));
  color: var(--primary);

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
  &__text {
    font-family: var(--font-family);
    padding: 0 rem(25px);
  }
  &__buttons {
    display: none;
  }
  &__figure {
    @include size(100%, 100%);
    align-self: center;
  }
}
</style>
