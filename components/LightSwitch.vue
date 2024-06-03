<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const isDark = ref(false);

onMounted(() => {
  const darkModeMediaQuery = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );
  isDark.value = darkModeMediaQuery.matches;
  toggleDarkModeClasses();
  darkModeMediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    isDark.value = e.matches;
    toggleDarkModeClasses();
  });
})

function toggleDarkMode(_event?: Event): void {
  isDark.value = !isDark.value;
  toggleDarkModeClasses();
}

function toggleDarkModeClasses() {
  const html = document.querySelector('html');
  if (isDark.value) {
    html?.classList.add('dark-scheme');
    html?.classList.remove('light-scheme');
  } else {
    html?.classList.add('light-scheme');
    html?.classList.remove('dark-scheme');
  }
}
</script>

<template>
  <button
    id="toggleDarkMode"
    :class="['container__button', 'switch', { 'switch--dark': isDark }]"
    type="button"
    role="switch"
    :aria-checked="`${isDark}`"
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


<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.switch {
  width: 45px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: var(--border-radius);
  border: 1px solid var(--stroke);
  padding: var(--space-3xs);
  background-color: var(--secondary);
  -webkit-tap-highlight-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &::before {
    width: 35px;
    height: 50px;
    position: absolute;
    content: '';
    border-radius: var(--space-3xs);
    background-color: var(--primary-dark);
    z-index: 0;
  }

  &__svg {
    width: 35px;
    height: 25px;
    padding: var(--space-3xs);
    border: var(--border);
    border-radius: var(--space-3xs);
    color: var(--stroke);
    transform: rotateX(30deg);
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
