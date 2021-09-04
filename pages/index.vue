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
import { defineComponent } from '@nuxtjs/composition-api';
import { useStory } from '~/composables/useStory';
import { useStoryBridge } from '~/composables/useStoryBridge';

export default defineComponent({
  name: 'Index',
  setup() {
    const story = useStory('home');
    useStoryBridge(story);
    return { story };
  },
  head(): Object {
    return {
      title: this.story?.content.seo.title,
      meta: [...this.$getMetaTags(this.story?.content.seo)],
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
});
</script>
