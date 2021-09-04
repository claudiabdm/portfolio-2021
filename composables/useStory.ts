import { useAsync, useContext } from '@nuxtjs/composition-api';
import { StoryData } from 'storyblok-js-client/types';

export function useStory(fullSlug: string) {
  const context = useContext();
  const version =
    context.query.value._storyblok || context.isDev ? 'draft' : 'published';
  const locale = context.i18n.locale;
  const story = useAsync(getStory, fullSlug);

  async function getStory() {
    try {
      const { data } = await context.app.$storyapi.get(
        `cdn/stories/${fullSlug}`,
        {
          version,
          language: locale,
          resolve_links: 'url',
        }
      );
      await context.store.dispatch(
        'i18n/setRouteParams',
        context.$translateSlug(data.story)
      );
      return data.story as StoryData;
    } catch (res) {
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
      return {} as StoryData;
    }
  }
  return story;
}
