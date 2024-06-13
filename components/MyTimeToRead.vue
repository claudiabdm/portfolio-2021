<script lang="ts" setup>
import { type ISbRichtext } from '@storyblok/js';

const props = withDefaults(defineProps<{ text: ISbRichtext }>(), {
    text: () => ({ content: [{ type: 'text', value: '' }], type: 'doc' })
})

const timeToRead = calculateReadingTime(props.text.content!);


function calculateReadingTime(content: ISbRichtext[]): number {
    const totalWords = _countWords(content);
    const time = totalWords / 200;
    const minutes = Math.ceil(time);
    return minutes;

    function _countWords(content: ISbRichtext[], count: number = 0) {
        for (const c of content) {
            if (c.content) {
                count += _countWords(c.content);
            } else if (c.text) {
                count += c.text.split(' ').length;
            }
        }
        return count;
    }
}
</script>

<template>
    <span class="time">
        <svg class="time__icon">
            <use href="~/public/sprite.svg#time" />
        </svg>
        <time class="time__min">
            {{ timeToRead }} {{ $t('minutes') }}
        </time>
    </span>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.time {
    display: inline-flex;
    align-items: center;
    font-size: var(--font-sm);

    &__icon {
        width: 14px;
        height: 14px;
        color: var(--primary);
        fill: var(--tertiary);
        margin-right: 5px;
    }

    &__min {
        white-space: pre;
    }
}
</style>