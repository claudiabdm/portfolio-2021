/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { StoryData } from 'storyblok-js-client/types';

const translateSlug = (
  story: StoryData & {
    translated_slugs: { path: string; lang: string }[];
  }
): { [key: string]: { slug: string } } => {
  const slugs: { [key: string]: { slug: string } } = {
    en: { slug: story.slug },
  };
  story.translated_slugs.forEach((translatedSlug) => {
    let translatedPath = translatedSlug.path;

    // when path is folder
    if (translatedSlug.path.slice(-1) === '/') {
      translatedPath = translatedSlug.path.slice(0, -1);
    }
    const translatedPathSplit = translatedPath.split('/');
    const slug = translatedPathSplit[translatedPathSplit.length - 1];
    slugs[translatedSlug.lang] = { slug };
  });
  return slugs;
};

declare module 'vue/types/vue' {
  interface Vue {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): {
      [key: string]: { slug: string };
    };
  }
}

Vue.prototype.$translateSlug = translateSlug;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): {
      [key: string]: { slug: string };
    };
  }
  interface Context {
    $translateSlug(
      story: StoryData & {
        translated_slugs: { path: string; lang: string }[];
      }
    ): {
      [key: string]: { slug: string };
    };
  }
}

const translateSlugPlugin: Plugin = ({ app }, inject) => {
  inject('translateSlug', translateSlug);
};

export default translateSlugPlugin;
