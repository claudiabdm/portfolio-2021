<template>
  <div>
    <picture class="image-wrapper">
      <source :srcset="srcset" type="image/webp" />
      <source :srcset="srcset" type="image/png" />
      <img
        :class="['image', { 'image--auto-size': autoSize }]"
        :alt="blok.image.alt"
        :width="blok.width"
        :height="blok.height"
        :src="src"
      />
    </picture>
    <svg style="width: 0; height: 0">
      <filter id="darken">
        <feColorMatrix
          type="matrix"
          values="0.75 0 0 0 0
              0 0.75 0 0 0
              0 0 0.75 0 0
              0 0 0 1 0 "
        />
      </filter>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Image } from '~/types/components';

export default Vue.extend({
  name: 'MyImage',
  props: {
    blok: {
      type: Object as () => Image,
      default: () => ({} as Image),
    },
    autoSize: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    src() {
      return this.$responsiveImg.createSrc(this.blok.image.filename, '1280x0');
    },
    srcset() {
      return this.$responsiveImg.createSrcset(
        this.blok.image.filename,
        '1280x0/filters:format(webp)'
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/mixins/mixins' as *;

.image-wrapper {
  display: flex;
}
.image {
  &--auto-size {
    @include size(100%, 100%);
    object-fit: cover;
    object-position: left;
  }
}

.dark-scheme {
  img {
    filter: url(#darken);
  }
}
</style>
