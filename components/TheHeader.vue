<template>
  <header class="header">
    <nav ref="nav" class="header__nav">
      <div
        v-for="link in links"
        :key="link.link"
        :class="[
          'header__link-wrapper',
          { 'header__link-wrapper--active': selectedRoute === link.link },
        ]"
        @click="onSelectRoute(link.link)"
      >
        <NuxtLink class="header__link link" :to="link.link" :exact="true">
          <div class="link__icon-wrapper">
            <svg class="link__icon">
              <use :href="iconPath(link.icon)" />
            </svg>
          </div>
          <span class="link__text">{{ link.text }}</span>
        </NuxtLink>
      </div>
    </nav>
    <div class="header__settings">
      <div class="header__lang">
        <NuxtLink
          class="header__link link"
          :to="switchLocalePath('en')"
          :exact="true"
        >
          EN
        </NuxtLink>
        <span aria-hidden="true" class="header__separator">|</span>
        <NuxtLink class="header__link link" :to="switchLocalePath('es')">
          ES
        </NuxtLink>
      </div>
      <MyButtonDarkMode />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import gsap from 'gsap';
export default Vue.extend({
  // TODO make header links more dynamic with storyblok
  name: 'TheHeader',
  data() {
    return {
      selectedRoute: '',
    };
  },
  computed: {
    links() {
      return [
        {
          link: this.localePath({
            name: 'index',
          }),
          text: this.$t('home'),
          icon: 'home',
        },
        {
          link: this.localePath({
            name: 'slug',
            params: { slug: this.$t('projectsUrl') as string },
          }),
          text: this.$t('projects'),
          icon: 'projects',
        },
        {
          link: this.localePath({
            name: 'slug',
            params: { slug: this.$t('aboutUrl') as string },
          }),
          text: this.$t('about'),
          icon: 'about',
        },
      ];
    },
  },
  watch: {
    $route(to, _from) {
      if (this.selectedRoute !== to.path) {
        this.onSelectRoute(to.path);
        this.disableAnimation();
      }
    },
  },
  mounted() {
    this.onSelectRoute(this.$route.path);
    this.animateHeader();
  },
  methods: {
    iconPath(icon: string): string {
      return require('@/assets/sprite.svg') + '#' + icon;
    },
    onSelectRoute(link: string): void {
      this.selectedRoute = link;
    },
    animateNav(nav: Element): void {
      gsap.set(nav, {
        autoAlpha: 0,
        yPercent: 100,
      });
      gsap.to(nav, {
        autoAlpha: 1,
        duration: 0.5,
        yPercent: 0,
        delay: 2,
        ease: 'ease.in',
      });
    },
    animateLinkIcons(
      linkIcons: NodeListOf<Element>,
      delay: number,
      yPercent: number
    ): void {
      gsap.set(linkIcons, {
        autoAlpha: 0,
        yPercent,
      });
      gsap.to(linkIcons, {
        autoAlpha: 1,
        duration: 1,
        yPercent: 0,
        ease: 'elastic',
        delay,
        stagger: {
          amount: 0.5,
        },
      });
    },
    animateHeader(): void {
      const nav = this.$refs.nav as Element;
      const linkIcons = nav.querySelectorAll('.link__icon');
      if (window.innerWidth < 1024) {
        this.animateNav(nav);
        this.animateLinkIcons(linkIcons, 2.5, 50);
      } else {
        this.animateLinkIcons(linkIcons, 0, -50);
      }
    },
    disableAnimation(): void {
      const nav = this.$refs.nav as Element;
      const linkIcons = nav.querySelectorAll('.link__icon');
      gsap.set([nav, linkIcons], {
        autoAlpha: 1,
      });
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.header {
  @include size(100%, auto);
  @include flex(center, flex-end);
  position: relative;
  padding: rem(10px);
  max-width: $max-width;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;

  &__nav {
    @include fixed(auto, 0, 0, 0);
    @include size(100%, #{rem($nav-height)});
    @include flex(center, space-around);
    border-top: $border;
    background-color: var(--tertiary);
    transition: background-color 0.15s ease-in-out;
    visibility: hidden;
    @media screen and (min-width: 1024px) {
      position: unset;
      flex-basis: 35%;
      justify-content: space-between;
      margin-top: auto;
      border-top: none;
      background-color: transparent;
      padding-left: 10px;
      visibility: visible;
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
    }
  }
  &__link-wrapper {
    @media screen and (min-width: 1024px) {
      &:hover {
        .link__text {
          transform: scale3d(1, 1, 1);
        }
      }
    }
    &--active {
      .link__icon {
        fill: var(--primary-light);
        animation: bounce 0.85s cubic-bezier(0.28, 0.84, 0.42, 1);
        @media screen and (min-width: 1024px) {
          fill: var(--tertiary);
        }
      }
      .link__text::after {
        content: '';
        transform: translate3d(0, 0, 0);
        background-color: var(--tertiary);
      }
    }
  }

  &__settings {
    @include size(100%, auto);
    @include flex(center, space-between);
  }

  &__lang {
    @include size(100%, auto);
    @include flex(center, flex-start);
    margin-right: 20px;
    padding-left: 15px;
    @media screen and (min-width: 1024px) {
      @include flex(center, flex-end);
    }
    .link {
      font-size: rem(16px);
      font-weight: 700;
    }
    .link.nuxt-link-active {
      text-decoration: underline;
      text-decoration-color: var(--secondary);
      text-decoration-skip-ink: none;
      text-decoration-thickness: rem(2px);
      text-underline-offset: rem(5px);
    }
  }

  &__separator {
    color: var(--tertiary);
    font-weight: 700;
    margin: 0 10px;
  }
}

.link {
  @include flex(center, center, column);
  color: var(--primary);
  font-size: rem(12px);
  font-weight: 400;
  text-decoration: none;
  text-transform: capitalize;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s linear;
  @media screen and (min-width: 1024px) {
    font-size: rem(16px);
    font-weight: 700;
  }

  &__icon-wrapper {
    @include size(rem(20px), rem(20px));
    @include flex(center, center);
    @media screen and (min-width: 1024px) {
      @include size(rem(32px), rem(32px));
      fill: var(--background);
      color: var(--primary);
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
    visibility: hidden;
    transition: fill 0.15s ease-in-out, color 0.15s ease-in-out;
    @media screen and (min-width: 1024px) {
      @include size(rem(30px), rem(30px));
      fill: var(--background);
      color: var(--primary);
    }
  }

  &__text {
    color: var(--primary-dark);
    @media screen and (min-width: 1024px) {
      @include flex(center, center, column);
      color: var(--primary);
      transform: scale3d(0, 0, 0);
      will-change: transform;
      transform-origin: center center;
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
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
