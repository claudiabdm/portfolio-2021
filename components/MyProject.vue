<script lang="ts" setup>
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { FilterButton, MyProject } from '~/types/components';
import { elevateAnimationObserver } from '~/utils/gsap-animations';

if (process.client) {
  gsap.registerPlugin(TextPlugin);
}


const props = defineProps<{ blok: MyProject }>();

const titleTimeline = ref<gsap.core.Timeline>();
const titleScrollTimeline = ref<gsap.core.Timeline>();
const cursorTimeline = ref<gsap.core.Timeline>();
const previousText = ref();
const timeout = ref();
const lastFilter = ref<FilterButton['tag']>('show-all');
const titleObserver = ref<IntersectionObserver>();
const windowObserver = ref<IntersectionObserver>();
const cursorRef = ref<Element>();
const titleRef = ref<Element>();
const windowRef = ref<Element>();

onMounted(() => {
  if (cursorRef.value && titleRef.value && windowRef.value) {
    cursorTimeline.value = createCursorTimeline(cursorRef.value);
    titleTimeline.value = createTitleTimeline(
      titleRef.value,
      props.blok.title
    ).pause(0);
    titleScrollTimeline.value = createTitleTimeline(
      titleRef.value,
      props.blok.title
    )
      .pause(0)
    windowObserver.value = elevateAnimationObserver(windowRef.value);
    titleObserver.value = createTitleObserver(
      titleRef.value,
      titleScrollTimeline.value
    );
  }
})

onBeforeUnmount(() => {
  titleTimeline.value?.kill();
  titleScrollTimeline.value?.kill();
  cursorTimeline.value?.kill();
  titleObserver.value?.disconnect();
  windowObserver.value?.disconnect();
})

function createTitleObserver(
  target: Element,
  timeline: gsap.core.Timeline
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          timeline.restart();
        }
      }
    }
  );
  observer.observe(target);
  return observer;
}

function createTitleTimeline(titleRef: Element, text: string) {
  const tl = gsap.timeline();
  tl.add(textAnimation(titleRef, text));
  return tl;
}

function createCursorTimeline(cursorRef: Element) {
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
  });
  tl.fromTo(
    cursorRef,
    {
      autoAlpha: 1,
    },
    {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'steps(1)',
    }
  );
  return tl;
}

function onLinkHover(text: string) {
  if (text === previousText.value) return;
  if (text !== props.blok.title && timeout.value > 0) {
    clearTimeout(timeout.value);
  }
  titleScrollTimeline.value?.pause(0);
  previousText.value = text;
  cursorTimeline.value?.pause(0);
  titleTimeline.value?.reverse(titleTimeline.value?.time());
  titleTimeline.value?.eventCallback('onReverseComplete', () => {
    titleTimeline.value = createTitleTimeline(titleRef.value!, text);
    titleTimeline.value.play(0);
    titleTimeline.value.eventCallback('onComplete', () => {
      cursorTimeline.value?.restart();
      if (text !== props.blok.title) {
        timeout.value = setTimeout(() => {
          onLinkHover(props.blok.title);
        }, 500);
      }
    });
  });
}

function textAnimation(elem: Element, text: string): gsap.core.Tween {
  return gsap.to(elem, {
    id: 'textAnimation',
    duration: text.length / 16,
    text: {
      value: text,
    },
    ease: 'none',
  });
}
</script>

<template>
  <section
    v-editable="blok"
    class="project"
  >
    <div class="project__group">
      <h2 class="project__title">
        <span class="dot">> </span>
        <span ref="titleRef"></span><span
          ref="cursorRef"
          class="dot"
        >_</span>
      </h2>
      <p class="project__description">
        {{ blok.description }}
      </p>
      <div class="project__links">
        <MyLink
          v-if="blok.demo.url"
          class="project__link"
          :link="blok.demo.url"
          @mouseenter.native="onLinkHover('Play with it')"
        >
          Live
        </MyLink>
        <MyLink
          v-if="blok.code.url"
          class="project__link"
          :link="blok.code.url"
          @mouseenter.native="onLinkHover('Check code')"
        >
          Code
        </MyLink>
      </div>
    </div>
    <div class="project__media">
      <div
        ref="windowRef"
        class="window"
      >
        <div class="window__header">
          <svg class="window__buttons">
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="12"
              cy="12"
              r="4"
            />
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="28"
              cy="12"
              r="4"
            />
            <circle
              stroke-width="2"
              stroke="currentColor"
              cx="44"
              cy="12"
              r="4"
            />
          </svg>
          <span class="window__title">{{ blok.title }}</span>
        </div>
        <MyImage
          class="window__image"
          :blok="{
            image: {
              id: blok.media.id,
              filename: blok.media.filename,
              alt: blok.media.alt,
            },
            width: 370,
            height: 231.25,
          }"
          :size-list="[512, 768, 640]"
          :breakpoints="[420, 600, 768]"
        />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.project {
  display: grid;
  grid-template-areas: 'media' 'group';
  grid-template-rows: max-content 1fr;
  row-gap: 20px;
  align-content: flex-start;
  height: 100%;

  &__title {
    font-size: var(--font-3xl);
    font-weight: 700;
    font-family: var(--font-family-secondary);
    margin-bottom: var(--space-xs);
  }

  &__group {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 0;
    grid-area: group;
  }

  &__description,
  &__links {
    padding-left: 25px;
  }

  &__links {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding-top: 10px;
  }

  &__link {
    margin-right: var(--space-s);
  }

  &__media {
    grid-area: media;
    border-radius: var(--border-radius);
    background-color: var(--shadow);
    margin-left: 10px;
  }
}

.window {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--stroke);
  border-radius: var(--border-radius);
  color: var(--shadow);
  background-color: var(--secondary);
  overflow: hidden;

  &__header {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 2px solid var(--stroke);
    padding: 5px;
  }

  &__buttons {
    width: 64px;
    height: 24px;
    position: absolute;

    circle {
      fill: var(--tertiary);
      color: var(--stroke);
    }
  }

  &__title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    font-family: var(--font-family-secondary);
    font-size: 14px;
  }

  &__image {
    display: flex;
  }
}

.dot {
  color: var(--tertiary);
}
</style>
