// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./lang/en";
import es from "./lang/es";
import { fetchSbRoutes, getSbToken } from "./utils/sb-functions"

export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    host: '192.168.1.58',
    port: 3000,
    https: {
      key: './server.key',
      cert: './server.crt'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: false
    }
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      try {
        const sbRoutes = await fetchSbRoutes();

        if (nitroConfig.prerender?.routes) {
          nitroConfig.prerender.routes = sbRoutes;
        }

      } catch (error) {
        console.error(error)
      }
    }
  },
  imports: {
    autoImport: false,
  },
  site: {
    url: 'https://www.claudiabdm.com',
    trailingSlash: true,
    excludeAppSources: true,
  },
  sitemap: {
    autoI18n: true,
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'link', content: 'rel="apple-touch-icon" href="/logo.svg' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: [
    '~/assets/styles/styles.scss',
  ],
  modules: [
    '@storyblok/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts'
  ],
  storyblok: {
    accessToken: getSbToken(),
    componentsDir: '~/components',
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  i18n: {
    baseUrl: 'https://www.claudiabdm.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Español',
      },
    ],
    detectBrowserLanguage: false,
    trailingSlash: true,
  },
  googleFonts: {
    download: true,
    preload: true,
    overwriting: true,
    families: {
      'Open Sans': {
        wght: [300, 700],
      },
      'Jost': {
        wght: [700],
      }
    }
  },
  pwa: {
    devOptions: {
      enabled: true,
    },
    registerType: 'autoUpdate',
    pwaAssets: {
      config: true,
    },
    manifest: {
      name: 'Claudia Benito: Front-end developer',
      short_name: 'CvFy',
      description: 'I am a front-end developer with a passion for building user friendly and performant SPAs and JAMstack sites.',
      theme_color: '#b8c1ec',
    },
  },
})