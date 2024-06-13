<script lang="ts" setup>
import { computed } from 'vue';
import type { MyPostList } from '~/types/components';

const props = defineProps<{ blok: MyPostList }>();

const postFiltered = computed(() => props.blok.posts.filter(p => typeof p !== 'string'))

</script>

<template>
    <section class="post-list">
        <NuxtLinkLocale
            :href="`/${post.default_full_slug}`"
            class="post-list__container"
            v-for="post in postFiltered"
        >
            <article class="post-list__item">
                <h3>
                    {{ post.name }}
                    <span class="dot">.</span>
                </h3>
                <div>
                    {{ post.content.intro }}
                </div>
                <TextWithArrow>Read more</TextWithArrow>
            </article>
        </NuxtLinkLocale>
    </section>
</template>

<style lang="scss" scoped>
.post-list {
    display: grid;
    grid-template-columns: repeat(auto-fit,
            minmax(max(45ch, calc((100% - 50px) / 2)), 1fr));
    gap: var(--space-m);
    flex-wrap: wrap;
    margin: var(--space-m);

    &__container {
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }

    a.post-list__container {
        text-decoration: none;
        font-family: var(--font-family-primary);
        font-weight: 300;
        &:visited {
            color: var(--primary);
        }
    }

    &__item {
        display: grid;
        grid-template-rows: auto 1fr max-content;
        gap: var(--space-xs);
        height: 100%;
        padding: var(--space-xs) var(--space-xs) var(--space-s) var(--space-xs);
        border-radius: var(--border-radius);
        border: var(--border);
        background-color: var(--secondary);
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                transform: translate3d(5px, 5px, 0);
                cursor: pointer;
            }

            &:active {
                transform: translate3d(10px, 10px, 0);
            }
        }

        :deep(.arrow__svg) {
            fill: var(--tertiary)
        }
    }
}
</style>