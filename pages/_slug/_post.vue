<template>
  <main>
    <MyPost :blok="story.content" />
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api';
import { useStory } from '~/composables/useStory';
import { useStoryBridge } from '~/composables/useStoryBridge';

export default defineComponent({
  name: 'Post',
  setup() {
    const context = useContext();
    if (context.params.value.slug !== 'blog') return;
    const story = useStory(`blog/${context.params.value.post}`);
    useStoryBridge(story);
    return { story };
  },
  head(): Object {
    return {
      title: this.story?.content.seo.title,
      meta: [...this.$getMetaTags(this.story?.content.seo)],
      script: [...this.$getJsonLd(this.$nuxt)],
    };
  },
});
</script>
