<script setup lang="ts">
import type { NewsItem } from '~/data/news'
import { clearHistory, historyIds, removeHistory } from '~/composables/history'
import { allNews } from '~/data/news'

usePageTitle('阅读历史')

const history = computed(() => {
  const list: NewsItem[] = []
  for (const id of historyIds.value) {
    const item = allNews.find(news => news.id === id)
    if (item)
      list.push(item)
  }
  return list
})

const clearConfirm = ref(false)

function confirmClear() {
  clearHistory()
  clearConfirm.value = false
}
</script>

<template>
  <div class="p-4">
    <div class="mb-3 px-1 flex items-center justify-between">
      <h2 class="text-base font-bold">
        阅读历史
      </h2>
      <div class="flex gap-3 items-center">
        <span class="text-xs text-gray-400">
          共 {{ history.length }} 篇
        </span>
        <button
          v-if="history.length"
          class="text-xs text-gray-400 transition-colors hover:text-red-500"
          @click="clearConfirm = true"
        >
          清除
        </button>
      </div>
    </div>

    <div v-if="history.length" class="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800">
      <div
        v-for="item in history"
        :key="item.id"
        class="px-3 py-3 border-b border-gray-100 flex gap-2 items-center last:border-0 dark:border-gray-700/60"
      >
        <RouterLink :to="`/news/${item.id}`" class="flex flex-1 gap-3 min-w-0 items-center">
          <div
            class="p-2 rounded-lg flex shrink-0 flex-col h-12 w-14 justify-between overflow-hidden"
            :style="{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }"
          >
            <span class="text-[10px] text-white/90 font-medium">
              {{ item.category }}
            </span>
            <span class="text-[10px] text-white/70">
              {{ item.tag }}
            </span>
          </div>
          <div class="flex flex-1 flex-col min-w-0">
            <h3 class="text-sm leading-snug font-medium line-clamp-2">
              {{ item.title }}
            </h3>
            <div class="text-xs text-gray-400 mt-1 flex gap-2 items-center dark:text-gray-500">
              <span class="i-carbon-time text-sm" />
              <span>{{ item.source }} · {{ item.time }}</span>
            </div>
          </div>
        </RouterLink>
        <button class="icon-btn text-lg text-gray-300 dark:text-gray-600" title="移除" @click="removeHistory(item.id)">
          <div class="i-carbon-close" />
        </button>
      </div>
    </div>

    <EmptyState v-else icon="i-carbon-history" text="还没有阅读记录，去首页逛逛吧">
      <RouterLink to="/" class="btn">
        去首页
      </RouterLink>
    </EmptyState>

    <AppDialog :open="clearConfirm" title="清除阅读历史" @close="clearConfirm = false">
      <p class="text-sm text-gray-500 leading-6 dark:text-gray-400">
        确定要清空全部 {{ history.length }} 条阅读记录吗？
      </p>
      <div class="mt-4 flex gap-3">
        <button class="btn flex-1 !text-gray-700 !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-700 hover:!bg-gray-300 dark:hover:!bg-gray-600" @click="clearConfirm = false">
          取消
        </button>
        <button class="btn flex-1 !bg-red-500 hover:!bg-red-600" @click="confirmClear">
          确定清空
        </button>
      </div>
    </AppDialog>
  </div>
</template>
