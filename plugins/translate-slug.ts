/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { StoryData } from 'storyblok-js-client/types';

interface translatedSlugs {
  [key: string]: { slug: string; post?: string };
}

const translateSlug = (
  story: StoryData & {
    translated_slugs: { path: string; lang: string }[];
  }
): translatedSlugs => {
  const slugs: translatedSlugs = (function defaultTranslatedSlugs() {
    if (story.content.component === 'MyPost') {
      return { en: { slug: 'blog', post: story.slug } };
    }
    return { en: { slug: story.slug } };
  })();

  story.translated_slugs.forEach((translatedSlug) => {
    let translatedPath = translatedSlug.path;

    // when path is folder
    if (translatedSlug.path.slice(-1) === '/') {
      translatedPath = translatedSlug.path.slice(0, -1);
    }
    const translatedPathSplit = translatedPath.split('/');
    const slug = translatedPathSplit[translatedPathSplit.length - 1];
    if (story.content.component === 'MyPost') {
      slugs[translatedSlug.lang] = { slug: 'blog', post: slug };
    } else {
      slugs[translatedSlug.lang] = { slug };
    }
  });

  return slugs;
};

declare module 'vue/types/vue' {
  interface Vue {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): translatedSlugs;
  }
}

Vue.prototype.$translateSlug = translateSlug;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): translatedSlugs;
  }
  interface Context {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): translatedSlugs;
  }
}

const translateSlugPlugin: Plugin = ({ app }, inject) => {
  inject('translateSlug', translateSlug);
};

export default translateSlugPlugin;
