<script lang="ts" setup>
import { useI18n } from '#imports';
import { computed } from 'vue';

const { locale } = useI18n();
const props = withDefaults(defineProps<{ date: Date, text: string }>(), {
    date: () => new Date(),
    text: ''
})

const localizedDate = computed(() => {
    let date = new Date(props.date || new Date());
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale.value, options);
    if (
        Object.prototype.toString.call(date) !== '[object Date]' ||
        isNaN(+date)
    )
        date = new Date();
    return formatter.format(date);
});
</script>

<template>
    <span class="date">
        <svg class="date__icon">
            <use href="~/public/sprite.svg#calendar" />
        </svg>
        {{ text }}
        <time
            class="date__time"
            :datetime="localizedDate"
        >{{ localizedDate }}</time>
    </span>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.date {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    font-weight: 300;
    font-size: var(--font-sm);
    line-height: 1.25;

    &__time {
        &::before {
            content: ' ';
            white-space: pre;
        }
    }

    &__icon {
        width: 14px;
        height: 14px;
        color: var(--primary);
        fill: var(--tertiary);
        margin-right: 5px;
    }
}
</style>
