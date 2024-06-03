import type { MetaAttrs } from "@nuxtjs/i18n";

const defaultImg =
  'https://a.storyblok.com/f/95455/1281x621/057ab305f2/card.png';

export function getMetaTags(seo: any): MetaAttrs[] {
  return [
    {
      name: 'description',
      content: seo.description,
    },
    {
      name: 'twitter:title',
      content:
        seo.twitter_title || seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      name: 'twitter:description',
      content: seo.twitter_description || seo.description,
    },
    {
      property: 'twitter:url',
      content: 'https://www.claudiabdm.com',
    },
    {
      property: 'twitter:site',
      content: '@claudiabdm',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: seo.twitter_image || defaultImg,
    },
    {
      name: 'twitter:image:alt',
      content: 'Card with the text Claudia Benito Front-end Developer',
    },
    {
      name: 'twitter:creator',
      content: '@claudiabdm',
    },
    {
      property: 'og:title',
      content:
        seo.og_title || seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      property: 'og:description',
      content: seo.og_description || seo.description,
    },
    {
      property: 'og:url',
      content: 'https://www.claudiabdm.com',
    },
    {
      property: 'og:site_name',
      content: 'https://www.claudiabdm.com',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: seo.og_image || defaultImg,
    },
    {
      name: 'og:image:alt',
      content: 'Card with the text Claudia Benito Front-end Developer',
    },
    {
      name: 'mobile-web-app-capable',
      content: seo.title || 'Claudia Benito: Front-end developer',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: seo.title || 'Claudia Benito: Front-end developer',
    },
  ];
}

