<template>
  <div v-editable="blok" class="filter">
    <button
      v-show="isPrevVisible"
      class="filter__arrow filter__arrow--prev"
      type="button"
      data-test="buttonPrev"
      @mousedown="onPrev()"
      @mouseleave="stopInterval"
      @mouseup="stopInterval"
      @touchstart="onPrev()"
      @touchend="stopInterval"
      @touchcancel="stopInterval"
    >
      <svg
        class="filter__svg"
        fill="none"
        stroke="currentColor"
        viewBox="5 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
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
    <button
      v-show="isNextVisible"
      class="filter__arrow filter__arrow--next"
      type="button"
      data-test="buttonNext"
      @mousedown="onNext()"
      @mouseleave="stopInterval"
      @mouseup="stopInterval"
      @touchstart="onNext()"
      @touchend="stopInterval"
      @touchcancel="stopInterval"
    >
      <svg
        class="filter__svg"
        fill="none"
        stroke="currentColor"
        viewBox="-5 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FilterButton, ProjectFilter } from '~/types/components';

export default Vue.extend({
  name: 'MyProjectFilter',
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
      offset: 10,
      isRow: false,
    };
  },
  mounted() {
    this.$nextTick();
    this.sliderScrollEl = this.$refs.sliderScroll as Element;
    this.setButtonVisibility({
      target: this.sliderScrollEl,
    } as unknown as Event);
    this.sliderScrollEl.addEventListener('scroll', this.setButtonVisibility);
  },
  methods: {
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
    setButtonVisibility(e: Event): void {
      const el = e.target as Element;
      this.isRow = false;
      if (el.scrollWidth - el.clientWidth <= 1) {
        this.isPrevVisible = false;
        this.isNextVisible = false;
        this.isRow = true;
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
  @include flex(stretch, flex-start);
  position: relative;
  &__container {
    @include flex(center, flex-start);
    position: relative;
    overflow: hidden;
    @media screen and (min-width: 1024px) {
      padding: 0;
    }
  }

  &__list {
    @include size(100%, 100%);
    @include flex(center, flex-start);
    padding: 10px 0;
    overflow: auto;
  }

  &__arrow {
    @include size(rem(32px), 100%);
    position: absolute;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
    &--next {
      right: rem(-20px);
    }
    &--prev {
      left: rem(-20px);
    }
  }

  &__svg {
    color: var(--primary);
  }
}
</style>
