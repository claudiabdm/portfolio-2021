<script setup lang="ts">
import { createError, useAsyncStoryblok, useHead, useI18n, useSetI18nParams } from '#imports';
import { useRoute } from 'vue-router';
import { useSbVersion } from '~/composables/useSbVersion';
import { getBreadcrumbList } from '~/utils/get-json-ld-breadcrumbs';
import { getMetaTags } from '~/utils/get-meta-tags';


const { params: { slug }, path } = useRoute();


const { t, locale, getLocaleMessage } = useI18n();

const url = Array.isArray(slug) && slug.length > 0 ? slug.join('/') : 'home';

const { value: story } = await useAsyncStoryblok(
  url,
  {
    version: useSbVersion(),
    language: locale.value,
    resolve_relations: (() => {
      if (slug.includes(t('projectsSlug'))) {
        return ['MyProjectList.body']
      }
      if (slug.includes(t('blogSlug'))) {
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
const storySlugArray = story.default_full_slug.split('/').filter(Boolean);
const root = storySlugArray[0];
const isChild = storySlugArray.length > 1;
const rootLocaleMessage = {
  en: getLocaleMessage('en')[`${root}Slug`],
  es: getLocaleMessage('es')[`${root}Slug`]
}

const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { slug: isChild ? [rootLocaleMessage.en, slug[1]] : rootLocaleMessage.en },
  es: { slug: isChild ? [rootLocaleMessage.es, slug[1]] : rootLocaleMessage.es }
})

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  title: story.content.seo.title,
  meta: [...getMetaTags(story.content.seo)],
  script: [getBreadcrumbList(path)],
})
</script>

<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
  />
</template>
