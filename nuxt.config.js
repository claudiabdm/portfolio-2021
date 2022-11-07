import { generateStoryblokRoutes } from './storyblok-sitemap-routes';
const isProd = process.env.NODE_ENV === 'production';
const token = isProd
  ? process.env.STORYBLOK_PUBLISHED
  : process.env.STORYBLOK_PREVIEW;
const version = isProd ? 'published' : 'draft';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: 3000, // default: 3000
    // host: '192.168.3.35', // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        rel: 'me',
        href: 'https://c.im/@claudiabdm',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/composition-api.ts',
    '~/plugins/rich-text-renderer.ts',
    '~/plugins/elastic-animation.client.ts',
    '~/plugins/responsive-img.ts',
    '~/plugins/translate-slug.ts',
    '~/plugins/elevate-animation.client.ts',
    '~/plugins/get-meta-tags.ts',
    '~/plugins/get-json-ld-breadcrumbs.ts',
    { src: '~/plugins/v-click-outside.ts', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'storyblok-nuxt',
      {
        accessToken: token,
        cacheProvider: 'memory',
      },
    ],
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.js',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es',
        file: 'es.js',
        name: 'Español',
      },
    ],
    lazy: true,
    seo: false,
    langDir: 'lang/',
    defaultLocale: 'en',
    parsePages: false,
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Claudia Benito: Front-end developer',
      description:
        'I am a front-end developer with a passion for building user friendly and performant SPAs and JAMstack sites.',
      short_name: 'claudiabdm',
      lang: 'en',
      background_color: '#b8c1ec',
    },
    icon: {
      fileName: 'logo.png',
    },
    meta: {
      theme_color: '#b8c1ec',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },

  generate: {
    routes() {
      return generateStoryblokRoutes(token, version).then((routes) => routes);
    },
    crawler: false,
  },

  sitemap: {
    hostname: 'https://www.claudiabdm.com',
    i18n: true,
    locales: ['en', 'es'],
    routesNameSeparator: '___',
    routes: generateStoryblokRoutes.bind(null, token, version),
  },
};
