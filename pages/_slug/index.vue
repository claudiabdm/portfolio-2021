<template>
  <main class="main">
    <component
      :is="component.component"
      v-for="component in story.content.body"
      :key="component._uid"
      v-editable="component"
      :blok="component"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { StoryData } from 'storyblok-js-client/types';

export default Vue.extend({
  name: 'Page',
  async asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';
    const fullSlug = context.params.slug;
    const locale = context.i18n.locale;
    try {
      const res = await context.app.$storyapi.get(`cdn/stories/${fullSlug}`, {
        version,
        language: locale,
        resolve_links: 'url',
      });
      const story = res.data.story;
      await context.store.dispatch(
        'i18n/setRouteParams',
        context.$translateSlug(story)
      );
      return { story };
    } catch (res: { response: { data: any; status: any } } | any) {
      if (!res.response) {
        context.error({
          statusCode: 404,
          message: 'invalid, touched to receive content form api',
        });
      } else {
        context.error({
          statusCode: res.response.status,
          message: `${res.response.data}. cont: ${version} cdn/stories${locale}/${fullSlug}`,
        });
      }
      return { story: {} as StoryData };
    }
  },
  data() {
    return {
      story: {
        id: '',
        content: {
          seo: {
            title: '',
          },
        },
      },
    };
  },
  head(): Object {
    return {
      title: this.story.content.seo.title,
      meta: [...this.$getMetaTags(this.story.content.seo)],
      script: [...this.$getJsonLd(this)],
    };
  },
  mounted() {
    this.$nuxt.context.app.$storybridge(() => {
      const { StoryblokBridge } = window as any;
      const storyblokInstance = new StoryblokBridge();
      storyblokInstance.on(
        ['input', 'published', 'change'],
        (event: StoryblokEventPayload) => {
          if (event.action === 'input') {
            if (event.story.id === this.story.id) {
              this.story.content = event.story.content;
            }
          } else {
            window.location.reload();
          }
        }
      );
    });
  },
});
</script>
<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.main {
  min-height: calc(
    100vh - (#{rem($header-height)} + #{rem($nav-height)} + 20px)
  );
  @media screen and (min-width: 1024px) {
    position: relative;
    height: calc(100vh - (#{rem($header-height)}));
    max-width: $max-width;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
