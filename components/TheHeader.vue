<script lang="ts" setup>
import { getSbVersion, useAsyncStoryblok, useI18n, useTranslateSlug } from '#imports';
import { computed, onMounted, ref } from 'vue';
import type { ISbStoryData } from '@storyblok/vue';
import { gsap } from 'gsap';
import type { Config } from '~/types/components';

const { locale, t, locales } = useI18n();
const translatePath = useTranslateSlug();
const navRef = ref<Element>();

const storyLocales = ref<{ [key: string]: ISbStoryData<Config> }>({});

for (const loc of locales.value) {
  const { value: story }: { value: ISbStoryData<Config> } = await useAsyncStoryblok('config', {
    version: getSbVersion(),
    language: loc.code,
    resolve_relations: 'config.pages',
  })
  storyLocales.value[loc.code] = story;
}

const storyLinks = computed(() =>
  storyLocales.value[locale.value].content.pages.map(story => {
    const slug = story.slug;
    return {
      text: story.content.title || t(story.slug),
      icon: `/sprite.svg#${story.slug}`,
      path: translatePath(slug)
    }
  })
);
onMounted(() => {
  animateHeader();
})

function animateHeader(): void {
  const nav = navRef.value;
  if (nav) {
    const linkIcons = nav.querySelectorAll('.link__icon');
    if (linkIcons.length > 0) {
      if (window.innerWidth < 1024) {
        animateNav(nav, 100, 0.5, 2);
        animateLinkIcons(linkIcons, 50, 1, 2.5);
      } else {
        animateNav(nav, 0, 0, 0);
        animateLinkIcons(linkIcons, -50, 1, 0);
      }
    }
  }

  function animateNav(
    nav: Element,
    yPercent: number,
    duration: number,
    delay: number
  ): void {
    gsap.set(nav, {
      autoAlpha: 0,
      yPercent,
    });
    gsap.to(nav, {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'ease.in',
      duration,
      delay,
    });
  }

  function animateLinkIcons(
    linkIcons: NodeListOf<Element>,
    yPercent: number,
    duration: number,
    delay: number
  ): void {
    gsap.set(linkIcons, {
      autoAlpha: 0,
      yPercent,
    });
    gsap.to(linkIcons, {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'elastic',
      delay,
      duration,
      stagger: {
        amount: 0.5,
      },
    });
  }
}
</script>

<template>
  <header class="header">
    <nav
      ref="navRef"
      class="header__nav"
    >
      <div
        v-for="link in storyLinks"
        :key="link.icon"
        class="header__link-wrapper"
      >
        <NuxtLinkLocale
          class="header__link link"
          :to="link.path"
          :exact="true"
        >
          <div class="link__icon-wrapper">
            <svg class="link__icon">
              <use :href="link.icon" />
            </svg>
          </div>
          <span class="link__text">{{ link.text }}</span>
        </NuxtLinkLocale>
      </div>
    </nav>
    <div class="header__settings">
      <div class="header__lang">
        <SwitchLocalePathLink
          class="header__link link link--lang"
          locale="en"
          :exact="true"
        >
          EN
        </SwitchLocalePathLink>
        <span
          aria-hidden="true"
          class="header__separator"
        >|</span>
        <SwitchLocalePathLink
          class="header__link link link--lang"
          locale="es"
        >
          ES
        </SwitchLocalePathLink>
      </div>
      <LightSwitch />
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.header {
  display: flex;
  align-items: center;
  max-width: var(--max-width);
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: var(--space-2xs);
  font-family: var(--font-family-secondary);
  z-index: 2;

  &__nav {
    position: fixed;
    inset: auto 0 0 0;
    width: 100%;
    height: var(--nav-height);
    display: flex;
    flex-basis: 50%;
    align-items: center;
    justify-content: space-around;
    border-top: $border;
    background-color: var(--tertiary);
    transition: background-color 0.15s ease-in-out;
    visibility: hidden;

    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      margin-top: auto;
      border-top: none;
      background-color: transparent;
      transition: none;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      border-top: none;
      background-color: transparent;
    }
  }

  &__link-wrapper {
    flex: 1;

    @media screen and (min-width: 1024px) {
      &:hover {
        .link__text {
          transform: scale3d(1, 1, 1);
        }
      }
    }
  }

  &__settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: 1024px) {
      justify-content: flex-end;
    }
  }

  &__lang {
    display: flex;
    align-items: center;
    margin-right: var(--space-s);
    padding-left: var(--space-xs);
  }

  &__separator {
    color: var(--tertiary);
    font-weight: 700;
    margin: 0 10px;
  }
}

:deep(.link) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: var(--font-12-16);
  font-weight: 700;
  text-decoration: none;
  text-transform: capitalize;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s linear;

  &.link--lang {
    font-size: var(--font-base);
    font-weight: 700;

    &:visited {
      color: var(--primary);
    }
  }

  &.link--lang.router-link-active {
    text-decoration: underline;
    text-decoration-color: var(--secondary);
    text-decoration-skip-ink: none;
    text-decoration-thickness: 2px;
    text-underline-offset: var(--space-3xs);
  }
}


.link {

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: var(--icon-s);
    height: var(--icon-s);
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
      width: var(--icon-m);
      height: var(--icon-m);
      fill: var(--background);
      color: var(--primary);
    }
  }

  .router-link-active &__icon {
    fill: var(--primary-light);
    animation: bounce 0.85s cubic-bezier(0.28, 0.84, 0.42, 1);

    @media screen and (min-width: 1024px) {
      fill: var(--tertiary);
    }
  }

  &__text {
    width: max-content;
    color: var(--primary-dark);

    &::after {
      content: '';
      transform: translate3d(0, 0, 0);
      background-color: var(--tertiary);
    }

    @media screen and (min-width: 1024px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
