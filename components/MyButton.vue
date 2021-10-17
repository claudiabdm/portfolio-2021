<template>
  <div
    v-if="blok"
    v-editable="blok"
    :class="['button-container', { 'button-container--round': blok.isRound }]"
  >
    <!-- Button -->
    <button
      v-if="!blok.isLink"
      :class="[
        'button',
        { 'button--selected': isSelected },
        { 'button--round': blok.isRound },
      ]"
      type="button"
      :data-animation="!isSelected"
      @click="onClick"
    >
      {{ blok.text }}
    </button>
    <!-- // Button -->

    <!-- Button to story -->
    <nuxt-link
      v-if="blok.isLink && blok.link.linktype === 'story'"
      class="button"
      :to="translatedLink"
    >
      {{ blok.text }}
    </nuxt-link>
    <!-- // Button to story -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PropType } from 'vue/types';
import { Button } from 'types/components';

export default Vue.extend({
  name: 'MyButton',
  props: {
    blok: {
      type: Object as PropType<Button>,
      default: () => ({
        text: 'Text button',
        isRound: false,
        isLink: false,
        link: {
          story: {
            full_slug: '',
          },
          cached_url: '',
          linktype: '',
        },
      }),
    },
    isSelected: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    translatedLink(): string {
      const slug = this.blok.link.story.full_slug;
      const locale = this.blok.link.story.full_slug.slice(0, 2);
      if (slug.slice(-1) === '/') {
        return locale === 'en' ? slug.slice(2, -1) : slug.slice(0, -1);
      }
      return locale === 'en' ? slug.slice(2) : slug;
    },
  },
  methods: {
    onClick(event: Event): void {
      this.$emit('buttonClicked', event);
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
@use 'sass:color' as color;

.button-container {
  @include size(max-content, max-content);
  position: relative;
  margin: rem(10px);
  border-radius: $border-radius;
  background-color: var(--primary);
  transition: background-color 0.15s linear;

  &--round {
    margin: rem(7px);
    border-radius: rem(50px);
  }
}
.button {
  @include flex(center, center);
  position: relative;
  border: $border;
  border-radius: inherit;
  padding: rem(10px) rem(21px);
  color: var(--primary-dark);
  background-color: var(--tertiary);
  font-size: rem(16px);
  font-family: var(--font-family-secondary);
  font-weight: 700;
  text-decoration: none;
  will-change: transform;
  transform: translate3d(rem(-10px), rem(-10px), 0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.15s linear;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translate3d(rem(-3px), rem(-3px), 0);
      cursor: pointer;
    }
    &:active {
      transform: translate3d(0, 0, 0);
    }
  }

  &--round {
    background-color: var(--secondary);
    color: var(--primary-dark);
    border-radius: rem(50px);
    padding: rem(5px) rem(11px);
    font-size: rem(14px);
    transform: translate3d(rem(-7px), rem(-7px), 0);
  }

  &--selected {
    transform: translate3d(0, 0, 0);
    background-color: color.scale($tertiary-dark, $lightness: -10%);
    &:hover {
      transform: translate3d(0, 0, 0);
    }
  }

  &--round.button--selected {
    background-color: var(--primary-light);
  }
}

.dark-scheme {
  .button-container {
    background-color: var(--stroke);
  }
}
</style>
