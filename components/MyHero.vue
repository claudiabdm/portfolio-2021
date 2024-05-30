<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { elasticAnimation } from '~/utils/gsap-animations';
import type { MyHero } from '~/types/components';

defineProps<{ blok: MyHero }>();

const heroRef = ref<Element | null>(null);
const heroGroupRef = ref<Element | null>(null);
const buttonsRef = ref<{ el: Element } | null>(null);
const textRef = ref<{ el: Element } | null>(null);
const heroFigureRef = ref<{ el: Element } | null>(null);

onMounted(() => {
  if (
    heroRef.value &&
    heroGroupRef.value &&
    buttonsRef.value?.el &&
    textRef.value?.el &&
    heroFigureRef.value?.el) {
    animateHero(
      heroRef.value,
      heroGroupRef.value,
      buttonsRef.value.el,
      textRef.value.el,
      heroFigureRef.value.el);
  }
})

function animateHero(
  hero: Element,
  heroGroup: Element,
  heroButtons: Element,
  heroText: Element,
  heroFigure: Element,
): void {
  const tl = gsap.timeline({
    delay: 0.25,
    defaults: { ease: 'ease.in', duration: 0.5 },
  });
  tl.set(heroButtons.querySelectorAll('.button'), {
    x: 0,
    y: 0,
  });

  tl.set(heroText.querySelector('h2'), {
    opacity: 0,
    yPercent: 50,
  });
  tl.set(heroText.querySelector('p'), {
    opacity: 0,
    yPercent: 20,
  });

  tl.from(hero, {
    autoAlpha: 0,
  });

  tl.from(
    heroGroup,
    {
      autoAlpha: 0,
    },
    '0'
  );

  tl.to(heroText.querySelector('h2'), {
    opacity: 1,
    yPercent: 0,
  });
  tl.to(heroText.querySelector('p'), {
    opacity: 1,
    yPercent: 0,
  });

  if (window.innerWidth > 1024) {
    tl.from(heroButtons, {
      autoAlpha: 0,
    });
    tl.add(
      elasticAnimation(
        heroButtons.querySelectorAll('.button'),
        -10,
        -10,
        0.75,
        0,
        0.25
      ),
      '>-=0.25'
    );
  }

  tl.from(
    heroFigure,
    {
      autoAlpha: 0,
      duration: 1,
    },
    '<'
  );
  tl.from(
    heroFigure.querySelectorAll('image'),
    {
      opacity: 0,
      clearProps: 'all',
      duration: 0.75,
      stagger: {
        amount: 0.25,
      },
    },
    '>-=0.5'
  );

}
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
  >
    <div
      ref="heroGroupRef"
      class="hero__group"
    >
      <MyRichText
        ref="textRef"
        class="hero__text"
        :text="blok.text"
      />
      <MyButtonList
        ref="buttonsRef"
        :blok="blok.buttonList[0]"
      />
    </div>
    <MyHeroFigure ref="heroFigureRef" />
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: var(--primary);
  
  @media screen and (min-width: $max-width) {
    margin-top: -50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__group {
    position: relative;
    padding: 0 25px;

    @media screen and (min-width: $max-width) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__text {
    position: relative;
    z-index: 1;
  }

}
</style>
