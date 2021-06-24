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

<script lang="js">
export default {
  name: 'Home',
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published';
    const fullSlug = (context.route.path === '/' || context.route.path === '') ? 'home' : context.route.path;
    return context.app.$storyapi.get(`cdn/stories/${fullSlug}`, {
      version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },
  data() {
    return {
      story: {
        content: {},
      },
    };
  },
  mounted() {
    this.$storybridge(
      () => {
        const storyblokInstance = new StoryblokBridge();

        storyblokInstance.on(['input', 'published', 'change'], (event) => {
        console.log(event)
        if (event.action === 'input') {
            if (event.story.id === this.story.id) {
              this.story.content = event.story.content;
            }
          } else {
            window.location.reload();
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
};
</script>
