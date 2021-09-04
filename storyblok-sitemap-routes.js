const axios = require('axios').default;
export async function generateStoryblokRoutes(token, version, type = 'routes') {
  const spaceRes = await axios.get(
    `https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`
  );
  const sitemap = ['/'];
  const routes = ['/'];

  // timestamp of latest publish
  const cacheVersion = spaceRes.data.space.version;

  // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
  const res = await axios.get(
    `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}&per_page=100`
  );

  for (const key of Object.keys(res.data.links)) {
    if (res.data.links[key].slug.includes('projects/')) continue;
    if (type === 'sitemap' && res.data.links[key].alternates.length < 1) {
      res.data.links[key].slug.includes('home')
        ? addHomeToSitemap()
        : sitemap.push({
            url: `/${res.data.links[key].slug}`,
            links: [{ lang: 'en', url: `/${res.data.links[key].slug}` }],
          });
      continue;
    }
    if (type === 'routes' && !res.data.links[key].slug.includes('home')) {
      routes.push(`/${res.data.links[key].slug}`);
    }
    addTranslated(res.data.links[key].alternates);
  }

  return type === 'sitemap' ? sitemap : routes;

  function addTranslated(translated) {
    translated.forEach((alt) => {
      type === 'sitemap'
        ? addTranslatedToSitemap(
            `/${res.data.links[key].slug}`,
            `/${alt.lang}/${alt.path}`
          )
        : routes.push(`/${alt.lang}/${alt.path}`);
    });
  }

  function addTranslatedToSitemap(main, translated) {
    sitemap.push(
      {
        url: main,
        links: [
          { lang: 'en', url: main },
          { lang: 'es', url: translated },
        ],
      },
      {
        url: translated,
        links: [
          { lang: 'en', url: main },
          { lang: 'es', url: translated },
        ],
      }
    );
  }

  function addHomeToSitemap() {
    sitemap.push(
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
  }
}
