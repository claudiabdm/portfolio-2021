const axios = require('axios').default;
export async function generateStoryblokRoutes() {
  const spaceRes = await axios.get(
    `https://api.storyblok.com/v1/cdn/spaces/me?token=6UGOBSieZjWsLODc3Avgugtt`
  );
  const routes = ['/'];

  // timestamp of latest publish
  const cacheVersion = spaceRes.data.space.version;

  // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
  const res = await axios.get(
    `https://api.storyblok.com/v1/cdn/links?token=6UGOBSieZjWsLODc3Avgugtt&version=published&cv=${cacheVersion}&per_page=100`
  );

  Object.keys(res.data.links).forEach((key) => {
    if (
      !res.data.links[key].slug.includes('projects/') &&
      !res.data.links[key].slug.includes('home')
    ) {
      if (res.data.links[key].alternates.length > 0) {
        res.data.links[key].alternates.forEach((alt) => {
          routes.push({
            url: `/${res.data.links[key].slug}`,
            links: [
              { lang: 'en', url: `/${res.data.links[key].slug}` },
              { lang: 'es', url: `/${alt.lang}/${alt.path}` },
            ],
          });
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
