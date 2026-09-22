<script setup lang="ts">
import { allNews } from '~/data/news'

const route = useRoute()
const routeParams = route.params as Record<string, string>

const tag = computed(() => decodeURIComponent(routeParams.tag ?? ''))

usePageTitle(() => `#${tag.value}`)

const list = computed(() => allNews.filter(item => item.tag === tag.value))
</script>

<template>
  <div class="p-4">
    <div class="mb-3 px-1 flex items-center justify-between">
      <h2 class="text-base font-bold">
        # {{ tag }}
      </h2>
      <span class="text-xs text-gray-400">
        共 {{ list.length }} 条
      </span>
    </div>

    <NewsList :items="list" featured empty-icon="i-carbon-tag" empty-text="该话题暂无资讯" />
  </div>
</template>
