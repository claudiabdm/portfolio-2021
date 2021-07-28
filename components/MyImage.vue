<template>
  <div>
    <picture ref="picture" class="image-wrapper">
      <source :data-srcset="srcsetWebp" type="image/webp" />
      <source :data-srcset="srcsetPng" type="image/png" />
      <img
        :class="['image', { 'image--auto-size': autoSize }]"
        :alt="blok.image.alt"
        :width="blok.width"
        :height="blok.height"
        :data-src="src"
        src="placeholder.svg"
        :style="{ borderRadius }"
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
    borderRadius: {
      type: String,
      default: '0',
    },
    sizeList: {
      type: Array as () => number[],
      default: () => [320, 480, 640],
    },
  },
  head() {
    return {
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: this.$responsiveImg.createSrc(
            this.blok.image.filename,
            '1280x0'
          ),
          imagesrcset: this.$responsiveImg.createSrcset(
            this.blok.image.filename,
            'filters:format(webp)',
            this.sizeList
          ),
        },
      ],
    };
  },
  computed: {
    src() {
      return this.$responsiveImg.createSrc(this.blok.image.filename, '1280x0');
    },
    srcsetPng() {
      return this.$responsiveImg.createSrcset(
        this.blok.image.filename,
        'filters:format(png)',
        this.sizeList
      );
    },
    srcsetWebp() {
      return this.$responsiveImg.createSrcset(
        this.blok.image.filename,
        'filters:format(webp)',
        this.sizeList
      );
    },
  },
  mounted() {
    const picture = this.$refs.picture as HTMLPictureElement;
    const pictureObserver = new IntersectionObserver(this.handleIntersect, {
      threshold: 0.5,
    });
    pictureObserver.observe(picture);
  },
  methods: {
    loadImage(pictureElement: HTMLPictureElement): void {
      if (pictureElement) {
        const sources = Array.from(
          pictureElement.querySelectorAll('source')
        ) as HTMLSourceElement[];
        for (const source of sources) {
          source.srcset = source.dataset.srcset as string;
        }
        const img = pictureElement.querySelector('img') as HTMLImageElement;
        img.src = pictureElement.dataset.src as string;
        img.classList.add('loaded');
      }
    },
    handleIntersect(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ): void {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target as HTMLPictureElement);
          observer.unobserve(entry.target);
        }
      });
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
  opacity: 0;
  transition: opacity 0.2s 0.15s ease-out;
  &--auto-size {
    @include size(100%, 100%);
    object-fit: cover;
    object-position: left;
  }
}

.loaded {
  opacity: 1;
}

.dark-scheme {
  .image {
    filter: url(#darken);
  }
}
</style>
