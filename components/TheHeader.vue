<template>
  <header class="header">
    <div class="header__logo">logo</div>
    <nav class="header__nav">
      <NuxtLink
        v-for="link in links"
        :key="link.link"
        class="header__link link"
        :to="link.link"
      >
        <svg class="link__icon">
          <use :href="iconPath(link.text)" />
        </svg>
        <span class="link__text">
          {{ link.text }}
        </span>
      </NuxtLink>
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
        { link: 'projects', text: 'projects' },
        { link: 'about', text: 'about' },
      ],
    };
  },
  methods: {
    iconPath(icon: string): string {
      return require('@/assets/icons.svg') + '#' + icon;
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
  padding: rem(10px);
  max-width: $max-width;
  margin-left: auto;
  margin-right: auto;

  &__logo {
    @include flex(center, flex-start);
  }

  &__nav {
    @include fixed(auto, 0, 0, 0);
    @include size(100%, auto);
    @include flex(center, space-around);
    border-top: $border;
    background-color: var(--tertiary);
    flex-basis: 20%;
    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      border-top: none;
      background-color: transparent;
    }
  }
  &__link {
    @include flex(center, space-between);
    position: relative;
    &::before {
      @include size(0%, rem(3px));
      @include absolute(100%, 0, 0, 0);
      content: '';
      background-color: var(--secondary);
      transition: width 0.25s ease-in-out, background-color 0.25s ease-in-out;
    }
    &.nuxt-link-exact-active {
      .link__icon {
        color: var(--stroke);
        fill: var(--primary-light);
      }
      &::before {
        width: 100%;
        content: '';
        background-color: var(--tertiary);
      }
    }
  }
}

.link {
  @include flex(center, center, column);
  padding: rem(10px);
  color: var(--primary-dark);
  font-size: rem(14px);
  font-weight: 400;
  text-decoration: none;
  text-transform: capitalize;
  @media screen and (min-width: 1024px) {
    padding: rem(5px);
    color: var(--primary);
    font-weight: 700;
  }
  &__icon {
    @include size(rem(20px), rem(20px));
    color: inherit;
    fill: transparent;
    transition: fill 0.15s ease-in-out, color 0.15s ease-in-out;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
}

@keyframes underline {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
