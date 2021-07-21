import Vue from 'vue';
import { Plugin } from '@nuxt/types';

const defaultImg =
  'https://a.storyblok.com/f/95455/1281x621/057ab305f2/card.png';

function getMetaTags(seo: any): Array<Object> {
  return [
    {
      hid: 'description',
      name: 'description',
      content: seo.description,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content:
        seo.twitter_title || seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: seo.twitter_description || seo.description,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: seo.twitter_image || defaultImg,
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@claudiabdm',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content:
        seo.og_title || seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: seo.og_description || seo.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: seo.og_image || defaultImg,
    },
    {
      hid: 'mobile-web-app-capable',
      name: 'mobile-web-app-capable',
      content: seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: seo.title || 'Claudia Benito: Front-end developer',
    },
  ];
}

declare module 'vue/types/vue' {
  interface Vue {
    $getMetaTags(seo: any): Array<Object>;
  }
}

Vue.prototype.$getMetaTags = getMetaTags;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $getMetaTags(seo: any): Array<Object>;
  }
  interface Context {
    $getMetaTags(seo: any): Array<Object>;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMetaTagsPlugin: Plugin = ({ app }, inject) => {
  inject('getMetaTags', getMetaTags);
};

export default getMetaTagsPlugin;
