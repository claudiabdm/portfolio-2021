<template>
  <li class="photo-grid-item">
    <button
      :ref="`${image.id}`"
      type="button"
      aria-label="Open photo in full screen"
      class="photo-grid-item__button"
      @click="onClick"
    >
      <MyImage
        :blok="{ image }"
        border-radius="8px"
        class="photo-grid-item__image"
        is-photo
      />
    </button>
    <MyPhotoGridImageModal v-if="isOpen" :image="image" @close="onClose" />
  </li>
</template>

<script lang="ts">
import { PropType } from '@vue/composition-api';
import Vue from 'vue';
import { Image } from '~/types/components';

export default Vue.extend({
  name: 'MyPhotoGridItem',
  props: {
    image: {
      type: Object as PropType<Image['image']>,
      default: () => ({
        id: '',
        filename: '',
      }),
    },
  },
  data() {
    return {
      isOpen: false,
      imageObserver: null as unknown as IntersectionObserver,
    };
  },
  mounted() {
    const imageRef = this.$refs[`${this.image.id}`] as Element;
    this.imageObserver = this.$elevateAnimationObserver(imageRef, '-5%');
  },
  beforeDestroy() {
    this.imageObserver.disconnect();
  },
  methods: {
    onClick() {
      this.isOpen = !this.isOpen;
    },
    onClose() {
      this.isOpen = false;
    },
  },
});
</script>

<style lang="scss">
@use '~/assets/styles/mixins/mixins' as *;
@use '~/assets/styles/global/variables' as *;
@use 'sass:math';

.photo-grid-item {
  height: 100%;
  background-color: var(--shadow);
  border-radius: $border-radius;
  aspect-ratio: 1 / 1;

  &__button {
    height: 100%;
    padding: 5%;
    border: $border;
    border-radius: $border-radius;
    background-color: var(--secondary);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    &:hover {
      cursor: pointer;
      transform: translate3d(-2.5%, -2.5%, 0) !important;
    }
    &:active {
      transform: translate3d(0, 0, 0) !important;
    }
  }

  &__image {
    height: 100%;
  }
}
</style>
