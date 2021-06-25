<template>
  <section>
    <component
      :is="component.component"
      v-for="component in story.content.body"
      :key="component._uid"
      :blok="component"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';
    const fullSlug =
      context.route.path === '/' || context.route.path === ''
        ? 'home'
        : context.route.path;
    return context.app.$storyapi
      .get(`cdn/stories/${fullSlug}`, {
        version,
      })
      .then((res: { data: any }) => {
        return res.data;
      })
      .catch((res: { response: { status: any; data: any } }): void => {
        if (!res.response) {
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          });
        } else {
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          });
        }
      });
  },
  data() {
    return {
      story: {
        id: '',
        content: {},
      },
    };
  },
  mounted() {
    this.$nuxt.$storybridge(() => {
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
