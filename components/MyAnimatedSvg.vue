<template>
  <div>
    <component :is="`Svg${blok.name}`" :key="blok._uid" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AnimatedSvg } from '~/types/components';

export default Vue.extend({
  name: 'MyAnimatedSvg',
  props: {
    blok: {
      type: Object as () => AnimatedSvg,
      default: () => ({
        name: 'Computer',
      }),
    },
  },
});
</script>
