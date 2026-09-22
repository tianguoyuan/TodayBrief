<script setup lang="ts">
const route = useRoute()

const tabs = [
  { label: '实时', to: '/hot' },
  { label: '日榜', to: '/hot/day' },
  { label: '周榜', to: '/hot/week' },
  { label: '月榜', to: '/hot/month' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <div class="px-4 pt-3">
    <div class="p-1 rounded-xl bg-gray-200/70 flex gap-1 dark:bg-gray-700/50">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="text-xs font-medium py-1.5 text-center rounded-lg flex-1 transition-colors"
        :class="isActive(tab.to) ? 'bg-white text-orange-500 shadow-sm dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ tab.label }}
      </RouterLink>
    </div>
  </div>
</template>
