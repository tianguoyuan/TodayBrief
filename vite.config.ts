/// <reference types="vitest" />

import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vitest/config'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 把第三方核心库拆成稳定 vendor chunk，利于浏览器长期缓存
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) return 'vue'
          if (id.includes('node_modules/@vueuse')) return 'vueuse'
        },
      },
    },
  },
  plugins: [
    // https://github.com/vuejs/router/pull/2603
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),

    VueMacros({
      defineModels: false,
      defineOptions: false,
      plugins: {
        vue: Vue({
          script: {
            defineModel: true,
            propsDestructure: true,
          },
        }),
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      dirs: ['./src/composables'],
      dts: true,
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    createHtmlPlugin({
      inject: {
        data: {
          buildTime: new Date().toISOString(),
        },
      },
    }),
  ],

  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
