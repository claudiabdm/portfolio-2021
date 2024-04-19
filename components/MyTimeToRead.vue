<template>
  <span class="time">
    <svg class="time__icon">
      <use href="@/assets/sprite.svg#time" />
    </svg>
    <time class="blog__time">{{ timeToRead }}</time>
    {{ $t('minutes') }}
  </span>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MyTimeToRead',
  props: {
    text: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      timeToRead: 0,
    };
  },
  beforeMount() {
    this.timeToRead = this.calculateReadingTime(this.text);
  },
  methods: {
    calculateReadingTime(content: any[]) {
      const totalWords = _countWords(content);
      const time = totalWords / 200;
      const minutes = Math.ceil(time);
      return minutes;

      function _countWords(content: any[], count: number = 0) {
        for (const c of content) {
          if (c.content) {
            count += _countWords(c.content);
          } else if (c.text) {
            count += c.text.split(' ').length;
          }
        }
        return count;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.time {
  display: inline-flex;
  align-items: center;
  font-size: $text-sm;

  &__icon {
    @include size(14px, 14px);
    color: var(--primary);
    fill: var(--tertiary);
    margin-right: 5px;
  }
}
</style>
