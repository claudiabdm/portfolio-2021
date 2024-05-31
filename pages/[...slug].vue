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
    resolve_relations: slug.includes(t('projectsSlug')) ? ['MyProjectList.body'] : undefined
  }
)

if (!story) {
  throw createError({
    statusCode: 404,
    message: t('error404', { page: `${path}` }),
    fatal: true,
  })
}

const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { slug: getLocaleMessage('en')[`${story.slug}Slug`] },
  es: { slug: getLocaleMessage('es')[`${story.slug}Slug`] }
})

useHead({
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
