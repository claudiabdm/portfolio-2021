<template>
  <ul class="image-grid">
    <MyPhotoGridItem
      v-for="(image, index) in blok.images"
      :key="image.id"
      :image="image"
      :preload="index < 3"
    />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { PropType } from '@vue/composition-api';
import { Image } from '~/types/components';

export default Vue.extend({
  name: 'MyPhotoGrid',
  props: {
    blok: {
      type: Object as PropType<{ images: Image[] }>,
      default: () => ({
        images: [],
      }),
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/mixins/mixins' as *;
@use '~/assets/styles/global/variables' as *;
@use 'sass:math';

.image-grid {
  @include size(100%, auto);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-content: center;
  gap: rem(20px) rem(25px);
  margin-left: -5px;
  padding: 0 rem(25px) rem($nav-height);

  @media screen and (min-width: 736px) {
    margin-left: 5px;
    gap: rem(50px);
  }
}
</style>
