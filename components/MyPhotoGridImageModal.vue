<template>
  <div class="modal">
    <div class="modal__content">
      <button
        type="button"
        class="modal__button"
        aria-label="Close modal"
        @click="onClose"
      >
        <svg class="modal__icon">
          <use :href="require('@/assets/sprite.svg') + '#close'" />
        </svg>
      </button>
      <MyImage
        v-click-outside="onClose"
        :blok="{ ...size, image }"
        border-radius="8px"
        class="modal__image"
        :size-list="[2048]"
        :preload="false"
        is-photo-modal
        :style="`aspect-ratio:${size.width / size.height}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import vClickOutside from 'v-click-outside';

import { PropType } from '@vue/composition-api';
import { Image } from '~/types/components';

export default Vue.extend({
  name: 'MyPhotoGridImageModal',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    image: {
      type: Object as PropType<Image['image']>,
      default: () => ({
        id: '',
        filename: '',
      }),
    },
  },
  computed: {
    size(): { width: string | undefined; height: string | undefined } {
      const [width, height] = this.image.filename
        .split('/')
        .find((word: string) => word.includes('x'))
        ?.split('x') || [undefined, undefined];
      return { width, height };
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.onKeyDown);
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.onClose();
      }
    },
    onClose(event?: any) {
      if (event?.type === 'touchstart') return false; // Fix for Safari because it fires event on below buttons
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/mixins/mixins' as *;
@use '~/assets/styles/global/variables' as *;

.modal {
  @include flex(center, center);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--primary-08);
  transform: translateZ(12px); // Fixes switch button being over modal in Safari
  overflow: hidden;
  backdrop-filter: blur(10px);
  z-index: 100;

  &__content {
    @include size(100%, 100%);
    padding: 40px;
    position: relative;
  }

  &__image {
    @include flex(center, center);
    position: absolute;
    inset: 0;
    max-width: 90vw;
    max-height: 80vh;
    margin: auto;
    background-color: var(--secondary);
    border-radius: $border-radius;
    padding: 2%;
  }

  &__button {
    position: absolute;
    top: 5px;
    right: 5px;
    @include flex(center, center);
    border-radius: $border-radius;
    background-color: var(--secondary);
  }

  &__icon {
    @include size(rem(36px), rem(36px));
    color: var(--stroke);
  }
}
</style>
