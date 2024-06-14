import { useI18n } from "#imports";

export function useTranslateSlug() {
    const { t } = useI18n();
    return function translatePath(slug: string) {
        return {
            name: 'slug',
            params: {
                slug: t(slug + 'Slug') 
            }
        }
    }
}
