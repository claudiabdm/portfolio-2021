<template>
  <div>
    <TheHeader />
    <Nuxt class="main" />
  </div>
</template>
<style lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

html {
  font-family: var(--font-family);
  font-size: 16px;
}
body {
  background-color: var(--background);
  transition: background-color 0.15s linear;
  line-height: 1.75;
}
.main {
  min-height: calc(
    100vh - (#{rem($header-height)} + #{rem($nav-height)} + 20px)
  );
  @media screen and (min-width: 1024px) {
    position: relative;
    height: calc(100vh - (#{rem($header-height)}));
    max-width: $max-width;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
