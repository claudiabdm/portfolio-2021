<template>
  <ul class="button-list">
    <li v-for="button in buttons" :key="button._uid" class="button-list__elem">
      <MyButton :blok="button" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button } from '~/types/components';

export default Vue.extend({
  props: {
    buttons: {
      type: Array as () => Button[],
      default: () => [],
    },
  },
});
</script>

<style scoped></style>
