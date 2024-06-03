<script setup lang="ts">
import { ref } from 'vue';
import { type MyButtonList } from '~/types/components';

const el = ref<Element | null>(null);

defineExpose({ el })

defineProps<{ blok: MyButtonList }>();
</script>


<template>
  <ul
    v-editable="blok"
    class="button-list"
    ref="el"
  >
    <li
      v-for="button in blok.buttons"
      :key="button._uid"
      class="button-list__elem"
    >
      <MyButton :blok="button" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.button-list {
  display: none;
  margin-top: var(--space-s-m);

  @media screen and (min-width: $max-width) {
    display: flex;
  }
}
</style>