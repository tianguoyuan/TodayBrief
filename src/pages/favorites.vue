<script setup lang="ts">
  import { favoriteIds } from '~/composables/favorites'
  import { allNews } from '~/data/news'

  usePageTitle('收藏')

  const favorites = computed(() => allNews.filter((item) => favoriteIds.value.includes(item.id)))
</script>

<template>
  <div class="p-4">
    <div class="mb-3 px-1 flex items-center justify-between">
      <h2 class="text-base font-bold">我的收藏</h2>
      <span class="text-xs text-gray-400">共 {{ favorites.length }} 篇</span>
    </div>

    <NewsList emptyIcon="i-carbon-favorite" emptyText="还没有收藏任何资讯" featured :items="favorites">
      <template #empty>
        <RouterLink class="btn" to="/">去逛逛</RouterLink>
      </template>
    </NewsList>
  </div>
</template>
