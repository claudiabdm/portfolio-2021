import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { gsap } from 'gsap';

function levelUpAnimation(elem: Element, position: number): gsap.core.Tween {
  return gsap.to(elem, {
    x: position,
    y: position,
    ease: 'ease',
    duration: 0.5,
  });
}

function elevateAnimation(target: Element): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start: 'bottom bottom',
      end: 'top top',
      toggleActions: 'play reverse play reverse',
    },
  });
  tl.add(levelUpAnimation(target, -10));
  return tl;
}

declare module 'vue/types/vue' {
  interface Vue {
    $elevateAnimation(target: Element): gsap.core.Timeline;
  }
}

Vue.prototype.$elevateAnimation = elevateAnimation;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $elevateAnimation(target: Element): gsap.core.Timeline;
  }
  interface Context {
    $elevateAnimation(target: Element): gsap.core.Timeline;
  }
}

const elevateAnimationPlugin: Plugin = (_ctx, inject) => {
  inject('elevateAnimation', elevateAnimation);
};

export default elevateAnimationPlugin;
