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
import { defineComponent, useContext } from '@nuxtjs/composition-api';
import { useStory } from '~/composables/useStory';
import { useStoryBridge } from '~/composables/useStoryBridge';
export default defineComponent({
  name: 'Page',
  setup() {
    const context = useContext();
    const story = useStory(context.params.value.slug);
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
