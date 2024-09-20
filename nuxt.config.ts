// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-svgo'],
  css: [
    '~/assets/styles/_reset.css'  // 引入全域 CSS 檔案
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://dummyjson.com/', // 目標 API 的基礎 URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 重寫 URL 路徑
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_main.scss" as *;'
        }
      }
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      }
    }
  },
  ssr: false
})