<script setup lang="ts">
  import { APP_VERSION } from '~/utils/constants'

  usePageTitle('关于')

  const techStack = [
    { desc: 'Composition API + script setup', icon: 'i-carbon-code', name: 'Vue 3' },
    { desc: '极速的开发构建体验', icon: 'i-carbon-flash', name: 'Vite 8' },
    { desc: '类型安全，内聚可靠', icon: 'i-carbon-document', name: 'TypeScript' },
    { desc: '按需原子化样式', icon: 'i-carbon-paint-brush', name: 'UnoCSS' },
    { desc: '文件式路由，自动生成', icon: 'i-carbon-location', name: 'Vue Router' },
  ]

  const changelog = [
    { date: '2026-09', text: '新增阅读历史、消息中心、个人主页、分时段热榜、设置与应用介绍页。', version: 'v1.1.0' },
    { date: '2026-08', text: '首个版本上线：首页分类、热榜、收藏、搜索、评论与登录。', version: 'v1.0.0' },
  ]
</script>

<template>
  <div class="p-4 space-y-4">
    <div
      class="text-white p-6 text-center rounded-2xl flex flex-col gap-3 items-center from-orange-500 to-pink-500 bg-gradient-to-r"
    >
      <AppLogo />
      <p class="text-lg font-bold">今日快讯</p>
      <p class="text-xs opacity-80">只为更快看到世界</p>
      <span class="text-xs px-2.5 py-0.5 rounded-full bg-white/20">
        {{ APP_VERSION }}
      </span>
    </div>

    <div class="p-4 rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <h2 class="text-sm font-bold mb-2">关于应用</h2>
      <p class="text-xs text-gray-500 leading-6 dark:text-gray-400">
        今日快讯是一款移动端风格的资讯 Demo
        应用，用多彩卡片呈现世界，让资讯触手可及。演示数据全部为程序生成的模拟内容，用于展示前端交互与页面组织能力。
      </p>
    </div>

    <div class="p-4 rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <h2 class="text-sm font-bold mb-3">技术栈</h2>
      <div class="space-y-3">
        <div v-for="tech in techStack" :key="tech.name" class="flex gap-3 items-center">
          <div class="rounded-lg bg-gray-100 flex shrink-0 h-9 w-9 items-center justify-center dark:bg-gray-700/60">
            <div class="text-lg text-orange-500" :class="tech.icon" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium">
              {{ tech.name }}
            </p>
            <p class="text-xs text-gray-400">
              {{ tech.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <h2 class="text-sm font-bold mb-3">更新日志</h2>
      <div class="space-y-3">
        <div v-for="log in changelog" :key="log.version" class="flex gap-3 items-start">
          <span
            class="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-gray-100 shrink-0 whitespace-nowrap dark:bg-gray-700"
          >
            {{ log.version }}
          </span>
          <div class="min-w-0">
            <p class="text-xs text-gray-600 leading-5 dark:text-gray-300">
              {{ log.text }}
            </p>
            <p class="text-xs text-gray-300 mt-0.5 dark:text-gray-600">
              {{ log.date }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-xs text-gray-400 pb-4 text-center dark:text-gray-500">
      <p>今日快讯 · 只为更快看到世界</p>
      <p class="mt-1">© 2026 今日快讯</p>
    </div>
  </div>
</template>
