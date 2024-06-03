<script lang="ts" setup>
import type { MyAnimatedSvg } from '~/types/components';

defineProps<{ blok: MyAnimatedSvg }>();
</script>
<template>
  <div>
    <component
      :is="`Svg${blok.name}`"
      :key="blok._uid"
    />
  </div>
</template>
