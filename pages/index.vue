<template>
  <main>
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
  name: 'Index',
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';
    return context.app.$storyapi
      .get('cdn/stories/home', {
        version,
        language: context.i18n.locale,
        resolve_links: 'url',
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
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org/',
            '@type': 'Person',
            name: 'Claudia Benito',
            alternateName: 'claudiabdm',
            jobTitle: 'Front-end developer',
            url: 'http://www.claudiabdm.com',
          },
        },
      ],
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
            if (
              event.story &&
              String(event.story.id) === String(this.story.id)
            ) {
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
