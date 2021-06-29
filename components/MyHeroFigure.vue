<template>
  <div class="hero-figure">
    <svg
      class="hero-figure__svg"
      viewBox="0 0 628 745"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h628v745H0z" />
      <path
        id="blob"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M358.868 42.632c64.126 18.377 102.573 84.374 146.444 138.423 34.065 41.968 65.112 85.555 79.078 139.419 13.53 52.178 2.848 104.663-1.795 158.638-6.243 72.57 19.622 161.753-29.984 210.804-49.027 48.477-127.602 15.119-193.743 10.418-61.161-4.346-122.229-5.072-176.168-36.707-59.969-35.173-129.953-78.076-143.345-150.691-13.32-72.233 62.122-126.4 79.09-197.723 18.848-79.223-27.534-178.912 24.569-237.984 51.591-58.492 143.764-55.256 215.854-34.597z"
      />
      <image
        class="hero-figure__img hero-figure__img--avatar"
        href="@/assets/homie-05.png"
      />
      <image
        x="330"
        y="120"
        class="hero-figure__img hero-figure__img--window"
        href="@/assets/homie-objects-browser.png"
      />
      <defs>
        <filter id="darken">
          <feColorMatrix
            type="matrix"
            values="0.5 0 0 0 0
              0 0.5 0 0 0
              0 0 0.5 0 0
              0 0 0 1 0 "
          />
        </filter>
        <filter id="dropshadow" color-interpolation-filters="sRGB">
          <feDropShadow
            dx="10"
            dy="40"
            stdDeviation="20"
            flood-opacity="0.15"
          />
        </filter>

        <filter
          id="filter0_dd"
          x="17.787"
          y="9.037"
          width="593.213"
          height="726.852"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            values="0 0 0 0 0.137255 0 0 0 0 0.160784 0 0 0 0 0.27451 0 0 0 0.25 0"
          />
          <feBlend in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style scoped lang="scss">
@use '~/assets/styles/mixins/mixins' as *;
@use '~/assets/styles/global/variables' as *;
.hero-figure {
  @include flex(center, center);
  position: relative;
  &__svg {
    @include size(100%, 100%);
    max-width: 100vw;
    max-height: 35vh;

    @media screen and (min-height: 736px) {
      max-height: 45vh;
    }
    @media screen and (min-width: 1024px) {
      max-width: 100%;
      max-height: 100%;
      transform: rotate(0);
    }
    #blob {
      fill: var(--secondary);
      transform-origin: center center;
      transform: rotate(-90deg);
      filter: url(#filter0_dd);
      transition: fill 0.15s linear;
      @media screen and (min-width: 1024px) {
        transform: rotate(0);
      }
    }
  }
  &__img {
    position: relative;
    z-index: 1;
    filter: url(#dropshadow);
    transition: filter 0.15s linear;
    animation: float 1.5s infinite ease-in-out alternate-reverse;
    &--window {
      z-index: 2;
      animation-duration: 1s;
      animation-delay: -1s;
    }
  }
}

.dark-scheme {
  .hero-figure {
    &__svg {
      #blob {
        fill: var(--stroke);
        filter: none;
      }
    }
    &__img {
      filter: url(#darken);
    }
  }
}

@keyframes float {
  from {
    transform: translate3d(rem(-2px), rem(-5px), rem(-10px));
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
