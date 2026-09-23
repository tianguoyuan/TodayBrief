<script setup lang="ts">
import { allNews } from '~/data/news'

usePageTitle('搜索')

const query = ref('')

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q)
    return []
  return allNews.filter(item =>
    item.title.toLowerCase().includes(q)
    || item.source.toLowerCase().includes(q)
    || item.summary.toLowerCase().includes(q)
    || item.tag.toLowerCase().includes(q),
  )
})

const hotKeywords = computed(() => [...new Set(allNews.map(item => item.tag))].slice(0, 12))
</script>

<template>
  <div>
    <div class="px-4 pt-3">
      <div class="px-3 py-2 rounded-full bg-white flex gap-2 shadow-sm items-center dark:bg-gray-800">
        <div class="i-carbon-search text-gray-400 shrink-0" />
        <input
          v-model="query"
          type="search"
          placeholder="搜索新闻、来源、标签"
          class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
        >
        <button v-if="query" type="button" class="icon-btn text-lg text-gray-400" aria-label="清空" title="清空" @click="query = ''">
          <div class="i-carbon-close-filled" />
        </button>
      </div>
    </div>

    <div v-if="!query" class="p-4">
      <p class="text-xs text-gray-400 mb-2 px-1">
        热门标签
      </p>
      <div class="flex flex-wrap gap-2">
        <TagChip
          v-for="keyword in hotKeywords"
          :key="keyword"
          :to="`/tag/${keyword}`"
          :text="`# ${keyword}`"
        />
      </div>

      <p class="text-xs text-gray-400 mb-2 mt-6 px-1">
        大家都在搜
      </p>
      <NewsList :items="allNews.slice(0, 3)" />
    </div>

    <div v-else class="p-4 pt-3">
      <p class="text-xs text-gray-400 mb-3 px-1">
        "{{ query }}" 共找到 {{ results.length }} 条结果
      </p>
      <NewsList :items="results" empty-icon="i-carbon-search" empty-text="没有找到相关资讯，换个关键词试试" />
    </div>
  </div>
</template>
