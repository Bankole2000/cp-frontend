// import colors from 'vuetify/es5/util/colors'

export default {
  // mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Relodger',
    title: 'Relodger',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/vue-masonry', ssr: false },
    { src: '~/plugins/emoji-picker', ssr: false },
    // { src: '~/plugins/socket.client.js', mode: 'client' },
    '~/plugins/common-components.js',
    '~/plugins/common-filters.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
    'nuxt-leaflet',
  ],

  io: {
    sockets: [
      {
        name: 'profile',
        url: `${process.env.BASE_URL}${process.env.PROFILE_PORT}`,
      },
      {
        name: 'chat',
        url: `${process.env.BASE_URL}${process.env.CHAT_PORT}`,
      },
      {
        name: 'notification',
        url: `${process.env.BASE_URL}${process.env.NOTIFICATION_PORT}`,
      },
      {
        name: 'feed',
        url: `${process.env.BASE_URL}${process.env.FEED_PORT}`,
      },
      {
        name: 'post',
        url: `${process.env.BASE_URL}${process.env.POST_PORT}`,
      },
      {
        name: 'transaction',
        url: `${process.env.BASE_URL}${process.env.TRANSACTION_PORT}`,
      },
      {
        name: 'offer',
        url: `${process.env.BASE_URL}${process.env.OFFER_PORT}`,
      },
      {
        name: 'listing',
        url: `${process.env.BASE_URL}${process.env.LISTING_PORT}`,
      },
      {
        name: 'comms',
        url: `${process.env.BASE_URL}${process.env.COMMS_PORT}`,
      },
      {
        name: 'event',
        url: `${process.env.BASE_URL}${process.env.EVENT_PORT}`,
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost',
    credentials: true,
    withCredentials: true
  },

  publicRuntimeConfig: {
    // axios: {
    //   browserBaseURL: process.env.BASE_URL
    // }
    env: {
      baseURL: process.env.BASE_URL,
      authPath: process.env.BASE_URL + process.env.AUTH_PATH,
      chatPath: process.env.BASE_URL + process.env.CHAT_PATH,
      commsPath: process.env.BASE_URL + process.env.COMMS_PATH,
      eventPath: process.env.BASE_URL + process.env.EVENT_PATH,
      feedPath: process.env.BASE_URL + process.env.FEED_PATH,
      listingPath: process.env.BASE_URL + process.env.LISTING_PATH,
      notificationPath: process.env.BASE_URL + process.env.NOTIFICATION_PATH,
      offerPath: process.env.BASE_URL + process.env.OFFER_PATH,
      profilePath: process.env.BASE_URL + process.env.PROFILE_PATH,
      transactionPath: process.env.BASE_URL + process.env.TRANSACTION_PATH,
      postPath: process.env.BASE_URL + process.env.POST_PATH,
      ipFindAPIKey: process.env.IP_FIND_API_KEY,
      ipGeoAPIKey: process.env.IP_GEOLOCATION_API_KEY,
      giphyAPIKey: process.env.GIPHY_API_KEY
    }
  },

  privateRuntimeConfig: {
    // axios: {
    //   baseURL: process.env.BASE_URL
    // }

  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#833AB4',
          accent: '#E63083',
          error: '#FF2C1D',
          info: '#585DE4',
          warning: '#F77737',
          secondary: '#212121',
          success: '#5Ab55E',
        },
        light: {
          primary: '#833AB4',
          accent: '#E63083',
          error: '#FF2C1D',
          info: '#585DE4',
          warning: '#F77737',
          secondary: '#212121',
          success: '#5Ab55E',
        }
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^v-snackbars($|\/)/, 'short-uuid']
  },
  pageTransition: {
    name: 'router-anim',
    mode: 'out-in'
  }
}
