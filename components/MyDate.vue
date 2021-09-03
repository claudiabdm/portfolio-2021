<template>
  <div class="date">
    <svg class="date__icon">
      <use href="@/assets/sprite.svg#calendar" />
    </svg>
    {{ text }}
    <time class="date__time" :datetime="localizedDate">
      {{ localizedDate }}
    </time>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MyDate',
  props: {
    date: {
      type: [Date, String],
      default: () => new Date(),
    },
    text: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    localizedDate() {
      let date = new Date(this.date || new Date());
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat(this.$i18n.locale, options);
      if (
        Object.prototype.toString.call(date) !== '[object Date]' ||
        isNaN(+date)
      )
        date = new Date();
      return formatter.format(date);
    },
  },
});
</script>
<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.date {
  @include flex(center, flex-start);
  flex-wrap: wrap;
  font-weight: 300;
  font-size: $text-base;
  line-height: 1.25;

  &__time {
    &::before {
      content: ' ';
      white-space: pre;
    }
  }

  &__icon {
    @include size(rem(20px), rem(20px));
    color: var(--primary);
    fill: var(--tertiary);
    margin-right: 5px;
  }
}
</style>
