import { defineI18nConfig } from "#imports";
import en from "./lang/en";
import es from "./lang/es";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    availableLocales: ['en', 'es'],
    messages: {
        en,
        es
    }
}))