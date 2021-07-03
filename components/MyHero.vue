<template>
  <section ref="hero" v-editable="blok" class="hero">
    <SvgCorner class="hero__corner" />
    <div ref="heroGroup" class="hero__group">
      <SvgPoints class="hero__points" />
      <MyRichText ref="heroText" class="hero__text" :blok="blok.text" />
      <MyButtonList
        ref="heroButtons"
        class="hero__buttons"
        :buttons="blok.buttonList[0].buttons"
      />
    </div>
    <MyHeroFigure ref="heroFigure" class="hero__figure" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';
import MyRichText from '@/components/MyRichText.vue';
import MyButtonList from '@/components/MyButtonList.vue';
import MyHeroFigure from '@/components/MyHeroFigure.vue';

export default Vue.extend({
  components: {
    MyRichText,
    MyButtonList,
    MyHeroFigure,
  },
  props: {
    blok: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.animateHero();
  },
  methods: {
    animateHero(): void {
      if (!process.client) return;
      const hero = this.$refs.hero as Element;
      const heroGroup = this.$refs.heroGroup as Element;
      const heroButtons = this.$refs.heroButtons as Vue;
      const heroText = this.$refs.heroText as Vue;
      const heroFigure = this.$refs.heroFigure as Vue;
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      });
      tl.set(heroButtons.$el.querySelectorAll('.button'), {
        x: 0,
        y: 0,
      });
      tl.set(heroText.$el.querySelector('h2'), {
        opacity: 0,
        yPercent: 50,
      });
      tl.set(heroText.$el.querySelector('p'), {
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
      tl.to(heroText.$el.querySelector('h2'), {
        opacity: 1,
        yPercent: 0,
      });
      tl.to(heroText.$el.querySelector('p'), {
        opacity: 1,
        yPercent: 0,
      });
      if (window.innerWidth > 1024) {
        tl.from(heroButtons.$el, {
          autoAlpha: 0,
        });
        tl.to(heroButtons.$el.querySelectorAll('.button'), {
          opacity: 1,
          duration: 0,
        });
        tl.to(
          heroButtons.$el.querySelectorAll('.button'),
          {
            x: -10,
            y: -10,
            ease: 'elastic',
            clearProps: 'all',
            duration: 0.75,
            stagger: {
              amount: 0.25,
            },
          },
          '<-=0.25'
        );
      }
      tl.from(
        heroFigure.$el,
        {
          autoAlpha: 0,
          duration: 1,
        },
        '<'
      );
      tl.from(
        heroFigure.$el.querySelectorAll('image'),
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
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.hero {
  @include flex(flex-start, space-between, column);
  @include size(100%, 100%);
  position: relative;
  margin-top: auto;
  color: var(--primary);
  visibility: hidden;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__group {
    visibility: hidden;
    padding: 0 rem(25px);
    position: relative;
    @media screen and (min-width: 1024px) {
      @include flex(flex-start, space-between, column);
      @include size(100%, auto);
      padding: auto;
    }
  }

  &__points {
    display: none;
    @media screen and (min-width: 1024px) {
      @include size(100%, 100%);
      @include absolute(-60px, auto, auto, -55px);
      display: block;
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
    }
  }

  &__text {
    position: relative;
    z-index: 1;
  }
  &__buttons {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
      margin-top: 40px;
      visibility: hidden;
    }
  }
  &__figure {
    @include size(100%, 100%);
    z-index: 1;
    visibility: hidden;
    margin-bottom: auto;
  }

  &__corner {
    display: none;
    @media screen and (min-width: 1024px) {
      display: block;
      @include size(100%, 100%);
      @include absolute(20px, 20px, auto, auto);
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
      z-index: 0;
    }
  }
}
</style>
