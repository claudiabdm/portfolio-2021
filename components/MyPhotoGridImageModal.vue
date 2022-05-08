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
        :blok="{ image }"
        border-radius="8px"
        class="modal__image"
        :size-list="[2048]"
        :preload="false"
        is-photo-modal
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
    onClose() {
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
  overflow: hidden;
  z-index: 100;

  &__content {
    @include size(100%, 100%);
    @include flex(center, center);
    padding: 40px;
    position: relative;
  }

  &__image {
    @include size(auto, auto);
    display: flex;
    background-color: var(--secondary);
    border-radius: $border-radius;
    padding: 2.5%;
    picture {
      display: inline;
      height: 100% !important;
    }
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
