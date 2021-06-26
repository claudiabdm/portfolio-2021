<template>
  <header class="header">
    <div class="header__logo">logo</div>
    <nav class="header__nav">
      <NuxtLink
        v-for="link in links"
        :key="link"
        class="header__link"
        :to="link"
      >
        {{ link }}
      </NuxtLink>
    </nav>
    <MyButtonDarkMode />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      links: ['projects', 'about'],
    };
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.header {
  @include size(100%, auto);
  @include flex(center, space-between);
  padding: rem(30px);
  max-width: $max-width;

  &__logo {
    @include flex(center, flex-start);
  }

  &__nav {
    @include size(100%, auto);
    @include flex(center, space-between);
    flex-basis: 20%;
  }
  &__link {
    @include flex(center, space-between);
    position: relative;
    color: var(--primary);
    text-decoration: none;
    text-transform: capitalize;
    &::before {
      @include size(0%, rem(3px));
      @include absolute(100%, 0, 0, 0);
      content: '';
      background-color: var(--tertiary);
      transition: width 0.25s ease-in-out;
    }
    &.nuxt-link-active {
      &::before {
        width: 100%;
        content: '';
        background-color: var(--tertiary);
      }
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
