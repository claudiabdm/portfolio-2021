import type { MetaAttrs } from "@nuxtjs/i18n";

const defaultImg =
  'https://a.storyblok.com/f/95455/1281x621/057ab305f2/card.png';

export function getMetaTags(seo: any): MetaAttrs[] {
  return [
    {
      name: 'description',
      content: seo.description || seo.og_description,
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
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'image',
      property: 'og:image',
      content: seo.og_image || defaultImg,
    },
    {
      property: 'og:image:alt',
      content: seo.og_image.alt || 'Card with title text',
    },
    {
      name: 'mobile-web-app-capable',
      content: seo.title || seo.og_title || 'Claudia Benito: Front-end developer',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: seo.title || seo.og_title || 'Claudia Benito: Front-end developer',
    },
  ];
}

