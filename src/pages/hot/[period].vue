<script setup lang="ts">
import type { NewsItem } from '~/data/news'
import { allNews } from '~/data/news'

const route = useRoute()
const routeParams = route.params as Record<string, string>

const period = computed(() => routeParams.period || 'day')

const periodMeta: Record<string, { label: string, desc: string, seed: number }> = {
  day: { label: '日榜', desc: '今日热议 · 24 小时内攀升', seed: 1 },
  week: { label: '周榜', desc: '本周焦点 · 综合阅读与互动', seed: 3 },
  month: { label: '月榜', desc: '本月精选 · 长尾热度不减', seed: 7 },
}

usePageTitle(() => `${periodMeta[period.value]?.label ?? '热榜'}热榜`)

function parseReads(reads: string) {
  return reads.includes('万')
    ? Number.parseFloat(reads) * 10000
    : Number.parseInt(reads, 10)
}

function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++)
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  return Math.abs(hash)
}

function hotScore(item: NewsItem, seed: number) {
  const boost = (hashCode(item.id) * seed) % 6000
  return parseReads(item.reads) + boost
}

const hotList = computed(() => {
  const seed = periodMeta[period.value]?.seed ?? 1
  return [...allNews].sort((a, b) => hotScore(b, seed) - hotScore(a, seed)).slice(0, 10)
})
</script>

<template>
  <div>
    <HotTabs />

    <div class="p-4">
      <div class="mb-3 px-1 flex gap-2 items-center">
        <div class="i-carbon-flash text-xl text-orange-500" />
        <h2 class="text-base font-bold">
          {{ periodMeta[period]?.label ?? '热榜' }}热榜
        </h2>
        <span class="text-xs text-gray-400">
          {{ periodMeta[period]?.desc }}
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
          <div class="flex flex-1 flex-col min-w-0">
            <h3 class="text-sm leading-snug font-medium line-clamp-2">
              {{ item.title }}
            </h3>
            <div class="text-xs text-gray-400 mt-1 flex gap-2 items-center dark:text-gray-500">
              <span>{{ item.source }}</span>
              <span class="i-carbon-time text-sm" />
              <span>{{ item.reads }} 阅读</span>
            </div>
          </div>
          <span v-if="period !== 'day'" class="text-lg text-gray-300 shrink-0 dark:text-gray-600">
            <div class="i-carbon-arrow-up-right" />
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
