<script lang="ts" setup>
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
import type { MyPost } from '~/types/components';

withDefaults(defineProps<{ blok: MyPost }>(), {
    blok: () => ({} as MyPost)
})

const postRef = ref<Element>();

onMounted(() => {
    if (postRef.value) {
        animatePage(postRef.value);
    }
})
function animatePage(post: Element): void {
    if (!process.client) return;
    const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
    });
    if (window.innerWidth > 1024) {
        tl.from(post, {
            autoAlpha: 0,
        });
    } else {
        tl.from(post, {
            autoAlpha: 0,
            duration: 0.5,
        });
    }
}
</script>

<template>
    <article
        v-editable="blok"
        ref="postRef"
        class="post"
    >
        <h1
            ref="postTitle"
            class="post__title"
        >
            {{ blok.title }}<span class="dot">.</span>
        </h1>
        <div class="post__meta">
            <MyDate
                class="post__date"
                :date="new Date(blok.published_at ?? '')"
                :text="$t('lastUpdated')"
            />
            <MyTimeToRead :text="blok.longText" />
        </div>

        <p class="post__intro">
            {{ blok.intro }}
        </p>
        <hr class="post__break" />
        <MyRichText
            class="post__text"
            :text="blok.longText"
        />
    </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.post {
    position: relative;
    padding: var(--space-m) var(--space-m) var(--nav-height) var(--space-m);
    color: var(--primary);
    visibility: hidden;

    @media screen and (min-width: $max-width) {
        padding-top: 50px;
    }

    &__title {
        display: block;
        position: relative;
        margin-top: var(--nav-height);
        font-size: var(--font-4xl);
        font-weight: 700;
        font-family: var(--font-family-secondary);
        line-height: 1.25;
        z-index: 1;
    }

    &__meta {
        display: flex;
        gap: 16px;
    }

    &__meta,
    &__intro,
    &__text,
    &__break {
        margin-top: 25px;
    }

    &__summary {
        font-weight: bold;
        font-style: normal;
    }

    &__intro {
        font-style: italic;
    }

    &__break {
        border: none;
        box-shadow: 0 0 0 1px var(--secondary);
    }

    &__text {
        margin-bottom: 50px;
    }

}

.dot {
    color: var(--tertiary);
}
</style>