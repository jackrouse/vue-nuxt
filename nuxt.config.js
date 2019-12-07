module.exports = {
  mode: 'universal',
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  layoutTransition: 'layout',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/loading.vue',
  /*
   ** Global CSS
   */
  css: [
    'normalize.css/normalize.css', // a modern alternative to CSS resets
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '~assets/styles/index.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/axios', '@/plugins/init'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
    ['vue-scrollto/nuxt', { duration: 300 }]
  ],
  styleResources: {
    scss: './assets/styles/mixins/index.scss'
  },
  auth: {
    // token: {},
    // cookie: {
    //   options: {
    //     path: '/'
    //   }
    // },
    plugins: [{ src: '@/plugins/axios', ssr: true }, '@/plugins/auth.js'],
    resetOnError: true,
    scopeKey: 'roles',
    localStorage: false,
    redirect: {
      login: '/user/login',
      logout: '/',
      callback: '/user/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/user/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: { url: '/api/user/logout', method: 'post' },
          user: { url: '/api/user/info', method: 'get', propertyName: 'data' }
        },
        // tokenRequired: false,
        tokenType: false
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    // '/hero/': 'http://localhost:3000',
    // '/api/upload': {
    //   target: 'http://api.zhansha.love',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api/': ''
    //   }
    // },
    '/api/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        // 'postcss-url': false,
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          // grid: true
        }
      }
    }
  },
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0' // default: localhost,
  }
  // serverMiddleware: [{ path: '/api', handler: '~/server/routers/index.js' }]
}
