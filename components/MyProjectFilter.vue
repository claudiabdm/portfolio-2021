<template>
  <div v-editable="blok" class="filter">
    <div
      v-show="isPrevVisible"
      class="filter__scroll-shadow filter__scroll-shadow--prev"
      data-test="prev"
    ></div>
    <div class="filter__container">
      <ul ref="sliderScroll" class="filter__list">
        <li
          v-for="button in blok.buttonList"
          :key="button._uid"
          class="filter__elem"
        >
          <MyButton
            :blok="button"
            :is-selected="button.tag === filterSelected"
            :aria-pressed="button.tag === filterSelected"
            @buttonClicked="onFilterSelected(button.tag)"
          />
        </li>
      </ul>
    </div>
    <div
      v-show="isNextVisible"
      class="filter__scroll-shadow filter__scroll-shadow--next"
      data-test="next"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MyButton from './MyButton.vue';
import { FilterButton, ProjectFilter } from '~/types/components';
export default Vue.extend({
  name: 'MyProjectFilter',
  components: { MyButton },
  props: {
    blok: {
      type: Object as () => ProjectFilter,
      default: () => {},
    },
  },
  data() {
    return {
      filterSelected: 'show-all',
      sliderScrollEl: this.$refs.sliderScroll as Element,
      interval: 0 as any,
      position: 0,
      isPrevVisible: false,
      isNextVisible: false,
      offset: 5,
    };
  },
  mounted() {
    this.sliderScrollEl = this.$refs.sliderScroll as Element;
    this.setShadowVisibility({
      target: this.sliderScrollEl,
    } as unknown as Event);
    this.sliderScrollEl.addEventListener('scroll', this.setShadowVisibility);
    this.animateButtons();
  },
  methods: {
    animateButtons() {
      const projectFilterButtons = (
        this.$refs.sliderScroll as Element
      ).querySelectorAll('.button');
      this.$elasticAnimation(projectFilterButtons, -7, -7, 1, 0.45, 0.5);
    },
    onNext(): void {
      if (!this.interval) {
        this.interval = setInterval(
          this.changeScrollPosition.bind(null, this.sliderScrollEl, this.offset)
        );
      }
    },
    onPrev() {
      if (!this.interval) {
        this.interval = setInterval(
          this.changeScrollPosition.bind(
            null,
            this.sliderScrollEl,
            -this.offset
          )
        );
      }
    },
    changeScrollPosition(scrollElement: Element, offset: number): void {
      const scrollPosition =
        scrollElement.scrollLeft + scrollElement.clientWidth;
      if (scrollPosition < scrollElement.scrollWidth) {
        scrollElement.scrollBy({
          left: offset,
          behavior: 'smooth',
        });
      }
    },
    stopInterval(): void {
      clearInterval(this.interval);
      this.interval = 0;
    },
    setShadowVisibility(e: Event): void {
      const el = e.target as Element;
      if (el.scrollWidth - el.clientWidth <= 1) {
        this.isPrevVisible = false;
        this.isNextVisible = false;
      } else if (el.scrollLeft < this.offset) {
        this.isPrevVisible = false;
        this.isNextVisible = true;
      } else if (
        el.scrollWidth <
        el.scrollLeft + el.clientWidth + this.offset
      ) {
        this.isPrevVisible = true;
        this.isNextVisible = false;
      } else {
        this.isPrevVisible = true;
        this.isNextVisible = true;
      }
    },
    onFilterSelected(tag: FilterButton['tag']): void {
      this.filterSelected = tag;
      this.$emit('filterSelected', tag);
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.filter {
  @include flex(stretch, center);
  position: relative;
  &__container {
    @include flex(center, flex-start);
    position: relative;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    overflow: hidden;
    @media screen and (min-width: 1024px) {
      padding: 0;
    }
  }

  &__list {
    @include size(100%, 100%);
    @include flex(center, flex-start);
    border: $border;
    border-radius: $border-radius;
    padding: rem(10px) rem(10px) rem(5px);
    overflow: auto;
    background-color: var(--tertiary);
  }

  &__scroll-shadow {
    @include size(100%, 100%);
    position: absolute;
    z-index: 1;
    pointer-events: none;
    border-radius: $border-radius;
    &:hover {
      cursor: pointer;
    }
    &--next {
      background: linear-gradient(
        90deg,
        rgba($color: $stroke, $alpha: 0) 90%,
        rgba($color: $stroke, $alpha: 0.45) 100%
      );
      right: 0;
    }
    &--prev {
      left: 0;
      background: linear-gradient(
        -90deg,
        rgba($color: $stroke, $alpha: 0) 90%,
        rgba($color: $stroke, $alpha: 0.45) 100%
      );
    }
  }

  &__svg {
    color: var(--primary);
  }
}
</style>
