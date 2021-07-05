import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { gsap } from 'gsap';

const elasticAnimation = (
  target: gsap.TweenTarget,
  x: number,
  y: number,
  duration: number,
  delay: number,
  stagger: number
): gsap.core.Timeline => {
  const tl = gsap.timeline({
    defaults: { ease: 'elastic', duration, delay },
  });
  tl.set(target, {
    x: 0,
    y: 0,
  });
  tl.to(target, {
    opacity: 1,
    duration: 0,
  });
  tl.to(target, {
    x,
    y,
    clearProps: 'all',
    stagger: {
      amount: stagger,
    },
  });
  return tl;
};

declare module 'vue/types/vue' {
  interface Vue {
    $elasticAnimation(
      target: gsap.TweenTarget,
      x: number,
      y: number,
      duration: number,
      delay: number,
      stagger: number
    ): gsap.core.Timeline;
  }
}

Vue.prototype.$elasticAnimation = elasticAnimation;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $elasticAnimation(
      target: gsap.TweenTarget,
      x: number,
      y: number,
      duration: number,
      delay: number,
      stagger: number
    ): gsap.core.Timeline;
  }
  interface Context {
    $elasticAnimation(
      target: gsap.TweenTarget,
      x: number,
      y: number,
      duration: number,
      delay: number,
      stagger: number
    ): gsap.core.Timeline;
  }
}

const elasticAnimationPlugin: Plugin = (_ctx, inject) => {
  inject('elasticAnimation', elasticAnimation);
};

export default elasticAnimationPlugin;
