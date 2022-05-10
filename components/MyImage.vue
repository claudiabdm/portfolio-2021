<template>
  <div>
    <picture ref="picture" class="picture">
      <div v-if="isLoading" class="loading">
        <div class="circle" />
        <div class="circle" />
        <div class="circle" />
      </div>

      <template v-if="isPhotoModal">
        <source :data-srcset="`${srcsetWebp[0]}`" type="image/webp" />
        <source :data-srcset="`${srcsetPng[0]}`" type="image/png" />
      </template>

      <template v-else>
        <!-- WEBP -->
        <source
          :data-srcset="`${srcsetWebp[0]}`"
          :media="`(max-width: ${breakpoints[0]}px)`"
          type="image/webp"
        />
        <source
          v-for="(srcset, index) in srcsetWebp"
          :key="srcset + 'webp'"
          :data-srcset="`${srcset}`"
          :media="`${`(min-width: ${
            breakpoints[index - 1] + 1
          }px) and (max-width: ${breakpoints[index]}px)`}`"
          type="image/webp"
        />
        <source
          :data-srcset="`${srcsetWebp[srcsetWebp.length - 1]}`"
          :media="`(min-width: ${breakpoints[breakpoints.length - 1] + 1}px)`"
          type="image/webp"
        />

        <!-- PNG -->
        <source
          :data-srcset="`${srcsetPng[0]}`"
          :media="`(max-width: ${breakpoints[0]}px)`"
          type="image/png"
        />
        <source
          v-for="(srcset, index) in srcsetPng"
          :key="srcset + 'png'"
          :data-srcset="`${srcset}`"
          :media="`${`(min-width: ${
            breakpoints[index - 1] + 1
          }px) and (max-width: ${breakpoints[index]}px)`}`"
          type="image/png"
        />
        <source
          :data-srcset="`${srcsetPng[srcsetPng.length - 1]}`"
          :media="`(min-width: ${breakpoints[breakpoints.length - 1] + 1}px)`"
          type="image/png"
        />
      </template>
      <img
        :class="[
          'image',
          { 'image--auto-size': autoSize },
          { 'image--photo': isPhoto },
          { 'image--photo-modal': isPhotoModal },
        ]"
        :alt="blok.image.alt ? blok.image.alt : ''"
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
    isPhoto: {
      type: Boolean,
      default: false,
    },
    isPhotoModal: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: String,
      default: '0',
    },
    imageClass: {
      type: String,
      default: '',
    },
    sizeList: {
      type: Array as () => number[],
      default: () => [],
    },
    breakpoints: {
      type: Array as () => number[],
      default: () => [],
    },
    preload: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  head() {
    if (!this.preload) {
      return {};
    }
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
      if (this.isPhotoModal) {
        return this.blok.image.filename;
      }
      return this.$responsiveImg.createSrc(
        this.blok.image.filename,
        !this.isPhoto ? '1280x0' : '2048x0/smart'
      );
    },
    srcsetPng() {
      if (this.isPhotoModal) {
        return [`${this.blok.image.filename} ${this.blok.width}w`];
      }
      return this.$responsiveImg.createSrcset(
        this.blok.image.filename,
        'filters:format(png)',
        this.sizeList
      );
    },
    srcsetWebp() {
      if (this.isPhotoModal) {
        return [`${this.blok.image.filename} ${this.blok.width}w`];
      }

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
        img.onload = () => {
          this.isLoading = false;
        };
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
@use '~/assets/styles/global/variables' as *;
@use 'sass:math';

.image {
  opacity: 0;
  transition: opacity 0.2s 0.15s ease-out;
  &--auto-size {
    @include size(100%, 100%);
    object-fit: cover;
    object-position: left;
  }
  &--photo {
    display: block;
    max-width: 100%;
    object-position: center;
    aspect-ratio: 1 / 1;
  }
  &--photo-modal {
    display: block;
    object-position: center;
    object-fit: contain;
  }
}

.picture {
  position: relative;
}

.loading {
  @include flex(center, center);
  position: absolute;
  inset: 0;

  .circle {
    width: 8px;
    height: 8px;
    margin: 2px;
    border-radius: 50%;
    background-color: var(--tertiary);
    animation: bounce 0.5s infinite alternate cubic-bezier(0.77, 0, 0.18, 1);
  }

  .circle:nth-child(2) {
    animation-delay: 0.15s;
  }

  .circle:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
}
.loaded {
  opacity: 1;
}

.dark-scheme {
  .image:not(.image.image--photo-modal) {
    filter: url(#darken);
  }
}
</style>
