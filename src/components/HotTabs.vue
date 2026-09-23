<script setup lang="ts">
  import { normalizeQueryParam } from '~/utils/params'

  const route = useRoute()

  const tabs = [
    { key: 'realtime', label: '实时', query: {} as Record<string, string> },
    { key: 'day', label: '日榜', query: { period: 'day' } },
    { key: 'week', label: '周榜', query: { period: 'week' } },
    { key: 'month', label: '月榜', query: { period: 'month' } },
  ]

  const activePeriod = computed(() => {
    const keys = tabs.map((tab) => tab.key)
    return normalizeQueryParam(route.query.period, keys, 'realtime')
  })

  function isActive(key: string) {
    return activePeriod.value === key
  }
</script>

<template>
  <div class="px-4 pt-3">
    <div class="p-1 rounded-xl bg-gray-200/70 flex gap-1 dark:bg-gray-700/50">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.key"
        class="text-xs font-medium py-1.5 text-center rounded-lg flex-1 transition-colors"
        :class="
          isActive(tab.key) ? 'bg-white text-orange-500 shadow-sm dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400'
        "
        :to="{ path: '/hot', query: tab.query }"
      >
        {{ tab.label }}
      </RouterLink>
    </div>
  </div>
</template>
