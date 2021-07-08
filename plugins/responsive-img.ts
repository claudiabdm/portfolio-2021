import Vue from 'vue';
import { Plugin } from '@nuxt/types';

class ResponsiveImage {
  createSrcset(image: string, width: number, height: number = 0): string[] {
    const sizeList = [320, 640, 768, 960, 1024, 1280];
    const src = this.createSrc(image, `${width}x${height}`);
    const srcset = [];
    for (const size of sizeList) {
      srcset.push(`${src} ${size}w`);
    }
    return srcset;
  }

  createSrc(image: string, imageOptions: string): string {
    const path = image.replace(
      '//a.storyblok.com',
      `//img2.storyblok.com/${imageOptions}/filters:format(webp)`
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
