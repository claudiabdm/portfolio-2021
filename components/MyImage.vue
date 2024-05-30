<script lang="ts" setup>
import { useHead } from '#imports';
import { computed, onMounted, ref } from 'vue';
import type { MyImage } from '~/types/components';
import { responsiveImg } from '~/utils/responsive-image';

const el = ref<Element>();

defineExpose({ el })

interface Props {
  blok: MyImage,
  autoSize?: boolean,
  isPhoto?: boolean,
  isPhotoModal?: boolean,
  borderRadius?: string,
  imageClass?: string,
  sizeList?: number[],
  breakpoints?: number[],
  preload?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  autoSize: true,
  isPhoto: false,
  isPhotoModal: false,
  borderRadius: '0',
  imageClass: '',
  preload: true
});

const pictureRef = ref<Element>();
const isLoading = ref(true);


useHead({
  link: [
    props.preload ? {
      rel: 'preload',
      as: 'image',
      href: responsiveImg.createSrc(
        props.blok.image.filename,
        '1280x0'
      ),
      imagesrcset: responsiveImg.createSrcset(
        props.blok.image.filename,
        'filters:format(webp)',
        props.sizeList
      ).join(' '),
    } : {},
  ]
})


const src = computed(() => {
  if (props.isPhotoModal) {
    return props.blok.image.filename;
  }
  return responsiveImg.createSrc(
    props.blok.image.filename,
    !props.isPhoto ? '1280x0' : '2048x0/smart'
  );
})

const srcsetPng = computed(() => {
  if (props.isPhotoModal) {
    return [`${props.blok.image.filename} ${props.blok.width}w`];
  }
  return responsiveImg.createSrcset(
    props.blok.image.filename,
    'filters:format(png)',
    props.sizeList
  );
})

const srcsetWebp = computed(() => {
  if (props.isPhotoModal) {
    return [`${props.blok.image.filename} ${props.blok.width}w`];
  }
  return responsiveImg.createSrcset(
    props.blok.image.filename,
    'filters:format(webp)',
    props.sizeList
  );
})

onMounted(() => {
  if (pictureRef.value) {
    const pictureObserver = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    });
    pictureObserver.observe(pictureRef.value);
  }
})

function handleIntersect(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
): void {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target as HTMLPictureElement);
      observer.unobserve(entry.target);
    }
  });
}

function loadImage(pictureElement: HTMLPictureElement): void {
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
      isLoading.value = false;
    };
    img.classList.add('loaded');
  }
}
</script>
<template>
  <div ref="el">
    <picture
      ref="pictureRef"
      class="picture"
    >
      <div
        v-if="isLoading"
        class="loading"
      >
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>

      <template v-if="isPhotoModal">
        <source
          :data-srcset="`${srcsetWebp[0]}`"
          type="image/webp"
        />
        <source
          :data-srcset="`${srcsetPng[0]}`"
          type="image/png"
        />
      </template>

      <template v-else>
        <!-- WEBP -->
        <template v-if="breakpoints">
          <source
            :data-srcset="`${srcsetWebp[0]}`"
            :media="`(max-width: ${breakpoints[0]}px)`"
            type="image/webp"
          />
          <source
            v-for="(srcset, index) in srcsetWebp"
            :key="srcset + 'webp'"
            :data-srcset="`${srcset}`"
            :media="`${`(min-width: ${breakpoints[index - 1] + 1
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
            :media="`${`(min-width: ${breakpoints[index - 1] + 1
              }px) and (max-width: ${breakpoints[index]}px)`}`"
            type="image/png"
          />
          <source
            :data-srcset="`${srcsetPng[srcsetPng.length - 1]}`"
            :media="`(min-width: ${breakpoints[breakpoints.length - 1] + 1}px)`"
            type="image/png"
          />
        </template>

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
        src="~/assets/placeholder.svg"
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

<style lang="scss" scoped>
@use 'sass:math';

.image {
  opacity: 0;
  transition: opacity 0.2s 0.15s ease-out;

  &--auto-size {
    width: 100%;
    height: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
