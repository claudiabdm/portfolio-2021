export function getPath(slug: string) {
    return {
        name: 'slug',
        params: {
            slug: slug === 'home' ? '' : slug
        }
    }
}
