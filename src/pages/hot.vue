<script setup lang="ts">
import { allNews } from '~/data/news'

usePageTitle('热榜')

function parseReads(reads: string) {
  return reads.includes('万')
    ? Number.parseFloat(reads) * 10000
    : Number.parseInt(reads, 10)
}

const hotList = computed(() =>
  [...allNews].sort((a, b) => parseReads(b.reads) - parseReads(a.reads)).slice(0, 10),
)
</script>

<template>
  <div>
    <HotTabs />

    <div class="p-4">
      <div class="mb-3 px-1 flex gap-2 items-center">
        <div class="i-carbon-fire text-xl text-orange-500" />
        <h2 class="text-base font-bold">
          实时热榜
        </h2>
        <span class="text-xs text-gray-400">
          全站实时 · 按阅读量更新
        </span>
      </div>

      <div class="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800">
        <RouterLink
          v-for="(item, index) in hotList"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="px-3 py-3 border-b border-gray-100 flex gap-3 transition-colors items-center last:border-0 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          <span
            class="text-xl font-black text-center shrink-0 w-8"
            :class="index < 3 ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'"
          >
            {{ index + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm leading-snug font-medium line-clamp-2">
              {{ item.title }}
            </h3>
            <div class="text-xs text-gray-400 mt-1 flex gap-2 items-center dark:text-gray-500">
              <span>{{ item.source }}</span>
              <span class="i-carbon-time text-sm" />
              <span>{{ item.reads }} 阅读</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
