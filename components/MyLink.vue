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
