import { onMounted, Ref, useContext } from '@nuxtjs/composition-api';
import { StoryData } from 'storyblok-js-client/types';

export function useStoryBridge(story: Ref<StoryData | null>) {
  const context = useContext();

  onMounted(() => {
    if (story.value) setStoryBridge(context, story.value);
  });

  function setStoryBridge(context: any, storyData: StoryData) {
    context.app.$storybridge(() => {
      const { StoryblokBridge } = window as any;
      const storyblokInstance = new StoryblokBridge();

      storyblokInstance.on(
        ['input', 'published', 'change'],
        (event: StoryblokEventPayload) => {
          if (event.action === 'input') {
            if (storyData !== null && event.story.id === storyData.id) {
              storyData.content = event.story.content;
            }
          } else {
            window.location.reload();
          }
        }
      );
    });
  }

  return {
    story,
  };
}
