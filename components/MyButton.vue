<script lang="ts" setup>
import { getPath } from '~/utils/get-path';
import type { MyButton } from '~/types/components';

const emit = defineEmits(['buttonClicked']);

const props = withDefaults(defineProps<{ blok: MyButton, isSelected?: boolean }>(), {
  blok: () => ({
    text: 'Text button',
    isRound: false,
    isLink: false,
    link: {
      url: '',
      linktype: 'story',
      cached_url: '',
      story: {
        full_slug: '',
        slug: '',
      },
    }
  }),
  isSelected: false
});

const url = props.blok.link.cached_url.split('/').filter(Boolean);

function onClick(event: Event): void {
  emit('buttonClicked', event);
}

</script>

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
      :aria-pressed="isSelected"
      @click="onClick"
    >
      {{ blok.text }}
    </button>
    <!-- // Button -->

    <!-- Button to story -->
    <NuxtLinkLocale
      v-if="blok.isLink && blok.link.linktype === 'story'"
      class="button"
      :to="getPath(url.length === 1 ? url[0] : url[1])"
    >
      {{ blok.text }}
    </NuxtLinkLocale>
    <!-- // Button to story -->
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use 'sass:color' as color;

.button-container {
  position: relative;
  margin: var(--space-2xs);
  width: max-content;
  height: max-content;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  transition: background-color 0.15s linear;

  &--round {
    margin: 7px;
    border-radius: 50px;
  }
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border);
  border-radius: inherit;
  padding: 10px 21px;
  color: var(--primary-dark);
  background-color: var(--tertiary);
  font-size: 16px;
  font-family: var(--font-family-secondary);
  font-weight: 700;
  text-decoration: none;
  will-change: transform;
  transform: translate3d(-10px, -10px, 0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.15s linear;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translate3d(-3px, -3px, 0);
      cursor: pointer;
    }

    &:active {
      transform: translate3d(0, 0, 0);
    }
  }

  &--round {
    background-color: var(--secondary);
    color: var(--primary-dark);
    border-radius: 50px;
    padding: 5px 11px;
    font-size: 14px;
    transform: translate3d(-7px, -7px, 0);
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
