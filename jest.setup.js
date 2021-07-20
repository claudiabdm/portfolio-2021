import Vue from 'vue';
import StoryblokVue from 'storyblok-vue';
import { RouterLinkStub, config } from '@vue/test-utils';

Vue.use(StoryblokVue);

config.stubs = {
  NuxtLink: RouterLinkStub,
};
config.mocks = {
  $t: (msg) => {
    return msg;
  },
  localePath: (msg) => msg,
  switchLocalePath: (msg) => msg,
};
