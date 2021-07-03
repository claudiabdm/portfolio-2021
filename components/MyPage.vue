<template>
  <section v-editable="blok" class="page">
    <h2 class="page__title">{{ blok.title }}<span class="dot">.</span></h2>
    <component
      :is="component.component"
      v-for="component in blok.body"
      :key="component._uid"
      class="page__component"
      :blok="component"
    />
    <SvgPoints class="page__points" />
    <SvgCorner class="page__corner" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Page } from '~/types/components';

export default Vue.extend({
  name: 'MyPage',
  props: {
    blok: {
      type: Object as () => Page,
      default: () => {},
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.page {
  @include size(100%, 100%);
  color: var(--primary);
  position: relative;
  @media screen and (min-width: 1024px) {
    padding-top: rem(50px);
  }

  &__title {
    display: none;
    @media screen and (min-width: 1024px) {
      display: unset;
      position: relative;
      padding: 0 rem(25px);
      font-size: $text-6xl;
      font-weight: 700;
      font-family: var(--font-family-secondary);
      text-transform: capitalize;
      z-index: 1;
    }
  }

  &__component {
    margin-top: rem(25px);
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
