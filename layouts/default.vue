<template>
  <TheHeader />
  <main class="main">
    <SvgPoints class="main__svg main__points" />
    <slot class="main" />
    <SvgCorner class="main__svg main__corner" />
  </main>
</template>
<style lang="scss">
@use '~/assets/styles/variables' as *;

h1 {
  height: var(--header-height);
}

html {
  font-family: var(--font-family);
  font-size: 16px;
}

body {
  background-color: var(--background);
  overflow-x: hidden;
  transition: background-color 0.15s linear;
}

.main {
  min-height: var(--main-height);

  @media screen and (min-width: $max-width) {
    position: relative;
    height: var(--main-height);
    max-width: var(--max-width);
    margin-right: auto;
    margin-left: auto;
  }

  &__svg {
    display: none;

    @media screen and (min-width: $max-width) {
      position: absolute;
      inset: 50px 20px auto auto;
      display: block;
      width: 100px;
      color: var(--tertiary);
      opacity: 0;
      animation: fade-in 0.5s 1.5s ease-out forwards;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  }

  &__points {


    @media screen and (min-width: $max-width) {
      inset: 0 auto auto -55px;
    }
  }

  &__corner {

    @media screen and (min-width: $max-width) {
      inset: 50px 20px auto auto;
    }
  }

}

.dot {
  font-size: inherit;
  color: var(--tertiary);
}
</style>
