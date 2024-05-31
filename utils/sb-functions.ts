import type { ISbStories, ISbStoryData } from '@storyblok/js';
import en from '../lang/en'
import es from '../lang/es'

export function getSbToken(isProd: boolean) {
    return isProd ? process.env.STORYBLOK_PUBLISHED : process.env.STORYBLOK_PREVIEW;
}

export function getSbVersion(isProd: boolean) {
    return isProd ? 'published' : 'draft';
}

export async function fetchSbRoutes(isProd: boolean) {
    const token = getSbToken(isProd);

    let cache_version = 0

    let routes = ['/']

    try {
        const result = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)

        if (!result.ok) {
            throw new Error('Could not fetch Storyblok data')
        }

        // timestamp of latest publish
        const space = await result.json()
        cache_version = space.space.version

        // Recursively fetch all routes and set them to the routes array
        const storiesRoutes = await fetchSbStoriesRoutes(cache_version, undefined, isProd);

        routes.push(...storiesRoutes)

    } catch (error) {
        console.error(error)
    }

    return routes;
}

async function fetchSbStoriesRoutes(cacheVersion: number, page: number = 1, isProd: boolean) {
    const routes: string[] = [];
    const token = getSbToken(isProd);
    const version = getSbVersion(isProd);
    const perPage = 100
    const toIgnore = ['config', 'blog/', 'projects/'];
    const locales: { 'es': typeof es, 'en': typeof en } = { en: en, es: es };

    try {
        const response = await fetch(
            `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`,
        )
        const data: ISbStories['data'] = await response.json();

        // Add routes to the array
        (Object.values(data.links) as ISbStoryData[]).forEach((link) => {
            if (!toIgnore.some(s => link.slug.includes(s))) {
                for (const l in locales) {
                    const rootSlug = link.slug.split('/')[0];
                    const locale = l as keyof typeof locales;
                    const localeRootSlugKey = rootSlug + 'Slug' as keyof typeof locales[typeof locale];
                    const localeSlug = Object.hasOwn(locales[locale], localeRootSlugKey) ?
                        link.slug.replace(rootSlug, locales[locale][localeRootSlugKey]) :
                        link.slug

                    const localPath = locale == 'en' ?
                        `/${localeSlug}` :
                        `/${locale}/${localeSlug}`;
                    const localPathWithTrailingSlash = localPath[localPath.length - 1] === '/' ? localPath : localPath + '/';
                    routes.push(localPathWithTrailingSlash);
                }

            }
        })

        // Check if there are more pages with links
        const total = response.headers.get('total')
        const maxPage = total ? Math.ceil(Number(total) / perPage) : page;

        if (maxPage > page) {
            routes.push(...await fetchSbStoriesRoutes(cacheVersion, ++page, isProd))
        }

    } catch (error) {
        console.error(error)
    }

    return routes;
}