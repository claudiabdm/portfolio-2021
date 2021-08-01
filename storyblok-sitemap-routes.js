const axios = require('axios').default;
export async function generateStoryblokRoutes(token, version) {
  const spaceRes = await axios.get(
    `https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`
  );
  const routes = ['/'];

  // timestamp of latest publish
  const cacheVersion = spaceRes.data.space.version;

  // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
  const res = await axios.get(
    `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}&per_page=100`
  );

  Object.keys(res.data.links).forEach((key) => {
    if (!res.data.links[key].slug.includes('projects/')) {
      if (res.data.links[key].slug.includes('home')) {
        routes.push(
          {
            url: '/',
            links: [
              { lang: 'en', url: '/' },
              { lang: 'es', url: '/es' },
            ],
          },
          {
            url: '/es',
            links: [
              { lang: 'en', url: '/' },
              { lang: 'es', url: '/es' },
            ],
          }
        );
      } else if (res.data.links[key].alternates.length > 0) {
        res.data.links[key].alternates.forEach((alt) => {
          routes.push(
            {
              url: `/${res.data.links[key].slug}`,
              links: [
                { lang: 'en', url: `/${res.data.links[key].slug}` },
                { lang: 'es', url: `/${alt.lang}/${alt.path}` },
              ],
            },
            {
              url: `/${alt.lang}/${alt.path}`,
              links: [
                { lang: 'en', url: `/${res.data.links[key].slug}` },
                { lang: 'es', url: `/${alt.lang}/${alt.path}` },
              ],
            }
          );
        });
      } else {
        routes.push({
          url: `/${res.data.links[key].slug}`,
          links: [{ lang: 'en', url: `/${res.data.links[key].slug}` }],
        });
      }
    }
  });

  return routes;
}
