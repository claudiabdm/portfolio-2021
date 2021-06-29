<template>
  <header class="header">
    <div class="header__logo">logo</div>
    <nav class="header__nav">
      <div
        v-for="link in links"
        :key="link.link"
        :class="[
          'header__link-wrapper',
          { 'header__link-wrapper--active': selectedRoute === link.link },
        ]"
        @click="onSelectRoute(link.link)"
      >
        <NuxtLink class="header__link link" :to="link.link">
          <div class="link__icon-wrapper">
            <svg class="link__icon">
              <use :href="iconPath(link.text)" />
            </svg>
          </div>
          <span class="link__text">{{ link.text }}</span>
        </NuxtLink>
      </div>
    </nav>
    <MyButtonDarkMode />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheHeader',
  data() {
    return {
      links: [
        { link: '/', text: 'home' },
        { link: '/projects', text: 'projects' },
        { link: '/about', text: 'about' },
      ],
      selectedRoute: '/',
    };
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $route(to, _from) {
      if (this.selectedRoute !== to.path) {
        this.onSelectRoute(to.path);
      }
    },
  },
  methods: {
    iconPath(icon: string): string {
      return require('@/assets/sprite.svg') + '#' + icon;
    },
    onSelectRoute(link: string): void {
      this.selectedRoute = link;
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.header {
  @include size(100%, auto);
  @include flex(center, space-between);
  position: relative;
  padding: rem(10px);
  max-width: $max-width;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;

  &__logo {
    @include flex(center, flex-start);
  }

  &__nav {
    @include fixed(auto, 0, 0, 0);
    @include size(100%, #{rem($nav-height)});
    @include flex(center, space-around);
    border-top: $border;
    background-color: var(--tertiary);
    transition: background-color 0.15s ease-in-out;
    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      flex-basis: 20%;
      border-top: none;
      background-color: transparent;
    }
  }
  &__link {
    @include flex(center, space-between);
    position: relative;
    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      border-top: none;
      background-color: transparent;
      overflow: hidden;
    }
  }
  &__link-wrapper {
    &--active {
      .link__icon {
        fill: var(--primary-light);
        animation: bounce 0.85s cubic-bezier(0.28, 0.84, 0.42, 1);
      }
      .link__text::after {
        content: '';
        transform: translate3d(0, 0, 0);
        background-color: var(--tertiary);
      }
    }
  }
}

.link {
  @include flex(center, center, column);
  color: var(--primary-dark);
  font-size: rem(12px);
  font-weight: 400;
  text-decoration: none;
  text-transform: capitalize;
  -webkit-tap-highlight-color: transparent;
  @media screen and (min-width: 1024px) {
    font-size: rem(16px);
    color: var(--primary);
    font-weight: 700;
  }

  &__icon-wrapper {
    @include size(rem(20px), rem(20px));
    @include flex(center, center);
    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  &__icon {
    @include size(rem(18px), rem(18px));
    color: var(--stroke);
    fill: var(--tertiary);
    transform: translateZ(0);
    transform-origin: center center;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    z-index: 2;
    transition: fill 0.15s ease-in-out, color 0.15s ease-in-out;
  }

  &__text {
    @media screen and (min-width: 1024px) {
      @include flex(center, center, column);
      &::after {
        @include size(100%, rem(3px));
        content: '';
        display: block;
        background-color: var(--secondary);
        transform: translate3d(-105%, 0, 0);
        overflow: hidden;
        transition: transform 0.2s ease-in-out,
          background-color 0.25s ease-in-out;
      }
    }
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

@keyframes bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-5px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(-2px);
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
