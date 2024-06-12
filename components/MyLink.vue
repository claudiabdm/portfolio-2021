<script lang="ts" setup>

withDefaults(defineProps<{ link: string, external?: boolean }>(), {
  link: '',
  external: true
});

</script>
<template>
  <NuxtLinkLocale
    class="link"
    :to="link"
    :target="external ? '_blank' : '_self'"
    :external="external"
    rel="nooponer"
  >
    <TextWithArrow>

      <slot></slot>
    </TextWithArrow>
  </NuxtLinkLocale>
</template>

<style lang="scss">
a {
  color: var(--primary);
  background-color: transparent;
  font-weight: 700;
  font-family: var(--font-family-secondary);
  line-height: 1.5;
  text-decoration: underline;
  text-decoration-color: var(--tertiary);
  text-decoration-skip-ink: none;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
  transition: text-decoration-color 0.15s ease-out;

  &:hover {
    text-decoration-color: var(--secondary);
  }

  &:visited {
    color: var(--primary);
  }
}
</style>
