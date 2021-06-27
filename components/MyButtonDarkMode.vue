<template>
  <button
    id="toggleDarkMode"
    :class="['container__button', 'switch', { 'switch--dark': isDark }]"
    type="button"
    role="switch"
    :aria-checked="isDark"
    aria-label="Toggle dark mode"
    @click="toggleDarkMode"
  >
    <svg
      id="light"
      :class="[
        'switch__svg',
        'switch__svg--light',
        { 'switch__svg--selected': !isDark },
      ]"
      :fill="!isDark ? '#b8c1ec' : '#232946'"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      ></path>
    </svg>
    <svg
      id="dark"
      :class="[
        'switch__svg',
        'switch__svg--dark',
        { 'switch__svg--selected': isDark },
      ]"
      :fill="isDark ? '#b8c1ec' : '#232946'"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      ></path>
    </svg>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      isDark: false,
      currentMode: 'light',
    };
  },
  methods: {
    toggleDarkMode(_event: Event): void {
      this.isDark = !this.isDark;
      const html = document.querySelector('html');
      if (this.isDark) {
        html?.classList.add('dark-scheme');
        html?.classList.remove('light-scheme');
      } else {
        html?.classList.add('light-scheme');
        html?.classList.remove('dark-scheme');
      }
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.switch {
  @include size(rem(45px), rem(70px));
  @include flex(center, center, column);
  position: relative;
  border-radius: $border-radius;
  border: rem(1px) solid var(--stroke);
  padding: 5px;
  background-color: var(--secondary);
  &:hover {
    cursor: pointer;
  }
  &::before {
    @include size(35px, 50px);
    position: absolute;
    content: '';
    border-radius: rem(5px);
    background-color: var(--primary-dark);
    z-index: 0;
  }
  &__svg {
    @include size(rem(35px), rem(25px));
    padding: 5px;
    border: rem(1px) solid var(--stroke);
    border-radius: rem(5px);
    color: var(--stroke);
    transform: rotateX(30deg);
    perspective: rem(1px);
    backface-visibility: hidden;
    z-index: 1;
    will-change: transform;
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      fill 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    & path {
      pointer-events: none;
    }
    &--light {
      background-color: var(--tertiary-dark);
      border-bottom: none;
      border-bottom-left-radius: unset;
      border-bottom-right-radius: unset;
      transform-origin: center bottom;
    }
    &--dark {
      background: linear-gradient(var(--tertiary) -10%, var(--tertiary-light));
      border-top: none;
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      transform-origin: center top;
    }
    &--selected {
      background-color: var(--tertiary);
      transform: rotateX(0deg);
    }
    &--selected.switch__svg--dark {
      background: linear-gradient(var(--tertiary-dark) -10%, #{$tertiary});
      transform: rotateX(0deg);
    }
    &--selected.switch__svg--light {
      background-color: var(--tertiary);
    }
  }
}
</style>
