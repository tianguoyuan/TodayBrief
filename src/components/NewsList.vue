<script setup lang="ts">
  import type { NewsItem } from '~/data/news'

  const props = withDefaults(
    defineProps<{
      items: NewsItem[]
      featured?: boolean
      dividerText?: string
      emptyIcon?: string
      emptyText?: string
    }>(),
    {
      dividerText: '',
      emptyIcon: 'i-carbon-archive',
      emptyText: '暂无内容',
      featured: false,
    },
  )
</script>

<template>
  <div v-if="props.items.length" class="space-y-3">
    <NewsCard v-if="props.featured" featured :item="props.items[0]" />
    <template v-if="props.featured && props.items.length > 1">
      <div v-if="props.dividerText" class="text-xs text-gray-400 px-1 flex gap-2 items-center dark:text-gray-500">
        <span class="bg-gray-300/70 flex-1 h-px dark:bg-gray-700" />
        <span>{{ props.dividerText }}</span>
        <span class="bg-gray-300/70 flex-1 h-px dark:bg-gray-700" />
      </div>
      <NewsCard v-for="item in props.items.slice(1)" :key="item.id" :item="item" />
    </template>
    <template v-else>
      <NewsCard v-for="item in props.items" :key="item.id" :item="item" />
    </template>
  </div>
  <EmptyState v-else :icon="props.emptyIcon" :text="props.emptyText">
    <slot name="empty" />
  </EmptyState>
</template>
