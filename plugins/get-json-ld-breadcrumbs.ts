import Vue from 'vue';
import { Plugin } from '@nuxt/types';
import { NodeObject } from 'jsonld';
import { NuxtApp } from '@nuxt/types/app';

function getJsonLd(context: NuxtApp): NodeObject[] {
  return [
    {
      ...getBreadcrumbList(context.$route.path),
    },
  ];
}

function getBreadcrumbList(path: string): NodeObject {
  const pathArr = path.split('/').filter((elem) => elem !== '');
  const breadcrumbList = pathArr.reduce(
    (itemList: any[], elem: string, idx: number) => {
      const currentPath = pathArr.slice(0, idx + 1).join('/');
      itemList.push({
        '@type': 'ListItem',
        position: idx + 1,
        name: elem,
        item: `https://www.claudiabdm.com/${currentPath}`,
      });
      return itemList;
    },
    []
  );
  return {
    type: 'application/ld+json',
    json: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbList,
    },
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $getJsonLd(context: NuxtApp): NodeObject[];
  }
}

Vue.prototype.$getJsonLd = getJsonLd;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $getJsonLd(context: NuxtApp): NodeObject[];
  }
  interface Context {
    $getJsonLd(context: NuxtApp): NodeObject[];
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getJsonLdPlugin: Plugin = ({ app }, inject) => {
  inject('getJsonLd', getJsonLd);
};

export default getJsonLdPlugin;
