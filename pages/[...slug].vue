<script setup lang="ts">
import { createError, useAsyncStoryblok, useHead, useI18n } from '#imports';
import { useRoute } from 'vue-router';
import { useSbVersion } from '~/composables/useSbVersion';
import { getBreadcrumbList } from '~/utils/get-json-ld-breadcrumbs';
import { getMetaTags } from '~/utils/get-meta-tags';


const { params: { slug }, path } = useRoute();


const { t, locale } = useI18n();

const url = Array.isArray(slug) && slug.length > 0 ? slug.join('/') : 'home';

const { value: story } = await useAsyncStoryblok(
  url,
  {
    version: useSbVersion(),
    language: locale.value,
    resolve_relations: (() => {
      if (slug.includes('projects')) {
        return ['MyProjectList.body']
      }
      if (slug.includes('blog')) {
        return ['MyPostList.posts']
      }
      return undefined
    })()
  }
)

if (!story) {
  throw createError({
    statusCode: 404,
    message: t('error404', { page: `${path}` }),
    fatal: true,
  })
}

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  title: story.content.seo.title || story.content.seo.og_title,
  meta: [...getMetaTags(story.content.seo)],
  script: [{ ...getBreadcrumbList(path) }],
})
</script>

<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
  />
</template>
