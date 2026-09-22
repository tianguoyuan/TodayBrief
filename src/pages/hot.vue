<script setup lang="ts">
import type { NewsItem } from '~/data/news'
import { allNews } from '~/data/news'
import { hashString } from '~/utils/hash'
import { normalizeQueryParam } from '~/utils/params'

const route = useRoute()

interface PeriodMeta {
  label: string
  desc: string
  seed: number
  weight: number
}

const periodMeta: Record<string, PeriodMeta> = {
  realtime: { label: '实时', desc: '全站实时 · 按阅读量更新', seed: 0, weight: 1 },
  day: { label: '日榜', desc: '今日热议 · 短时热度攀升', seed: 2, weight: 3 },
  week: { label: '周榜', desc: '本周焦点 · 综合阅读与互动', seed: 5, weight: 7 },
  month: { label: '月榜', desc: '本月精选 · 长尾热度不减', seed: 9, weight: 13 },
}

function normalizePeriod(val: unknown) {
  return normalizeQueryParam(val, Object.keys(periodMeta), 'realtime')
}

const period = ref(normalizePeriod(route.query.period))

watch(() => route.query.period, (val) => {
  period.value = normalizePeriod(val)
})

usePageTitle(() => `${periodMeta[period.value]?.label ?? '热榜'}热榜`)

function parseReads(reads: string) {
  return reads.includes('万')
    ? Number.parseFloat(reads) * 10000
    : Number.parseInt(reads, 10)
}

function hotScore(item: NewsItem, meta: PeriodMeta) {
  const boost = ((hashString(item.id) % 89) + 1) * meta.weight * 40
  return parseReads(item.reads) * meta.weight + boost
}

const hotList = computed(() => {
  const meta = periodMeta[period.value] ?? periodMeta.realtime
  return [...allNews].sort((a, b) => hotScore(b, meta) - hotScore(a, meta)).slice(0, 10)
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

      <TransitionGroup
        name="hot-list"
        tag="div"
        class="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800"
      >
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
          <span v-if="period !== 'realtime'" class="text-lg text-gray-300 shrink-0 dark:text-gray-600">
            <div class="i-carbon-arrow-up-right" />
          </span>
        </RouterLink>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.hot-list-enter-active,
.hot-list-leave-active {
  transition: all 0.25s ease;
}

.hot-list-enter-from,
.hot-list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.hot-list-move {
  transition: transform 0.3s ease;
}
</style>
