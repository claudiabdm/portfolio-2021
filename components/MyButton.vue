<template>
  <button v-if="blok" class="button" type="button" @click="onClick">
    {{ blok.text }}
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Button } from 'types/components';

export default Vue.extend({
  name: 'MyButton',
  props: {
    blok: {
      type: Object as PropType<Button>,
      default: () => ({
        text: 'Text button',
        round: false,
      }),
    },
  },
  methods: {
    onClick(_event: Event): void {},
  },
});
</script>

<style scoped lang="scss"></style>
