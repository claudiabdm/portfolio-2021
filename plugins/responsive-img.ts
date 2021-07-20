import Vue from 'vue';
import { Plugin } from '@nuxt/types';

class ResponsiveImage {
  createSrcset(image: string, imageOptions: string): string[] {
    const sizeList = [320, 640, 768];
    const srcset = [];
    for (const size of sizeList) {
      const src = this.createSrc(image, `${size}x0/${imageOptions}`);
      srcset.push(`${src} ${size}w`);
    }
    return srcset;
  }

  createSrc(image: string, imageOptions: string): string {
    const path = image.replace(
      '//a.storyblok.com',
      `//img2.storyblok.com/${imageOptions}`
    );
    return path || '';
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $responsiveImg: ResponsiveImage;
  }
}

const responsiveImg = new ResponsiveImage();

Vue.prototype.$responsiveImg = responsiveImg;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $responsiveImg: ResponsiveImage;
  }
  interface Context {
    $responsiveImg: ResponsiveImage;
  }
}

const responsiveImgPlugin: Plugin = (_ctx, inject) => {
  inject('responsiveImg', responsiveImg);
};

export default responsiveImgPlugin;
