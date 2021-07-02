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

export default Vue.extend({
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
