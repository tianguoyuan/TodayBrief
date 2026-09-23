<script setup lang="ts">
  import type { NewsItem } from '~/data/news'
  import { categories } from '~/data/news'

  const { featured = false, item } = defineProps<{
    item: NewsItem
    featured?: boolean
  }>()

  const gradient = computed(() => `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`)

  const categoryLabel = computed(() => categories.find((c) => c.id === item.category)?.label ?? '')
</script>

<template>
  <div class="p-3 rounded-xl bg-white shadow-sm transition-shadow dark:bg-gray-800 hover:shadow-md">
    <!-- Featured: big banner on top -->
    <div v-if="featured">
      <RouterLink class="rounded-lg block overflow-hidden" :to="`/news/${item.id}`">
        <div class="p-3 flex h-44 items-end relative" :style="{ background: gradient }">
          <span class="text-xs text-white px-2 py-0.5 rounded-full bg-black/20 right-3 top-3 absolute backdrop-blur">
            {{ item.tag }}
          </span>
          <span class="text-xs text-white/80 font-medium">
            {{ categoryLabel }}
          </span>
        </div>
      </RouterLink>
      <RouterLink class="mt-3 block" :to="`/news/${item.id}`">
        <h2 class="text-base leading-snug font-semibold line-clamp-2">
          {{ item.title }}
        </h2>
        <p class="text-sm text-gray-500 mt-1.5 line-clamp-2 dark:text-gray-400">
          {{ item.summary }}
        </p>
      </RouterLink>
      <div class="text-xs text-gray-400 mt-2.5 flex items-center justify-between dark:text-gray-500">
        <span>{{ item.source }} · {{ item.time }}</span>
        <span class="flex gap-2 items-center">
          <span>{{ item.reads }} 阅读</span>
          <FavoriteButton :id="item.id" />
        </span>
      </div>
    </div>

    <!-- Default: thumbnail on the left -->
    <div v-else class="flex gap-3">
      <RouterLink class="shrink-0" :to="`/news/${item.id}`">
        <div
          class="p-2 rounded-lg flex flex-col h-20 w-26 justify-between overflow-hidden"
          :style="{ background: gradient }"
        >
          <span class="text-xs text-white/90 font-medium">
            {{ categoryLabel }}
          </span>
          <span class="text-xs text-white/70">
            {{ item.tag }}
          </span>
        </div>
      </RouterLink>
      <div class="flex flex-1 flex-col min-w-0">
        <RouterLink :to="`/news/${item.id}`">
          <h3 class="text-sm leading-snug font-medium line-clamp-2">
            {{ item.title }}
          </h3>
        </RouterLink>
        <div class="text-xs text-gray-400 mt-auto pt-2 flex items-center justify-between dark:text-gray-500">
          <span class="truncate">{{ item.source }} · {{ item.time }}</span>
          <span class="pl-2 flex shrink-0 gap-1.5 items-center">
            <span>{{ item.reads }}</span>
            <FavoriteButton :id="item.id" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
