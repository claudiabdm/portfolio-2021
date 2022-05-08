import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { gsap } from 'gsap';

function createElevateObserver(
  timeline: gsap.core.Timeline
): IntersectionObserver {
  return new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          timeline.play();
        } else {
          timeline.reverse();
        }
      }
    },
    {
      threshold: 1,
    }
  );
}

function levelUpAnimation(
  elem: Element,
  position: number | string
): gsap.core.Tween {
  return gsap.to(elem, {
    x: position,
    y: position,
    ease: 'ease',
    duration: 0.5,
  });
}

function elevateAnimationObserver(
  target: Element,
  elevation: number | string = -10
): IntersectionObserver {
  const tl = gsap.timeline();
  tl.add(levelUpAnimation(target, elevation));
  const observer = createElevateObserver(tl);
  observer.observe(target.parentElement as HTMLElement);
  return observer;
}

declare module 'vue/types/vue' {
  interface Vue {
    $elevateAnimationObserver(
      target: Element,
      elevation?: number | string
    ): IntersectionObserver;
  }
}

Vue.prototype.$elevateAnimationObserver = elevateAnimationObserver;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $elevateAnimationObserver(target: Element): IntersectionObserver;
  }
  interface Context {
    $elevateAnimationObserver(target: Element): IntersectionObserver;
  }
}

const elevateAnimationObserverPlugin: Plugin = (_ctx, inject) => {
  inject('elevateAnimationObserver', elevateAnimationObserver);
};

export default elevateAnimationObserverPlugin;
