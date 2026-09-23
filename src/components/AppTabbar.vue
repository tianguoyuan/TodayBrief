<script setup lang="ts">
const route = useRoute()

const tabs = [
  { path: '/', label: '首页', icon: 'i-carbon-home' },
  { path: '/hot', label: '热榜', icon: 'i-carbon-fire' },
  { path: '/favorites', label: '收藏', icon: 'i-carbon-favorite' },
  { path: '/me', label: '我的', icon: 'i-carbon-user' },
]

const show = computed(() => tabs.some(tab => route.path === tab.path))

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <nav v-if="show" class="border-t border-gray-200/70 bg-white/90 flex bottom-0 sticky z-10 backdrop-blur dark:border-gray-700/70 dark:bg-gray-900/90">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="text-xs py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex flex-1 flex-col gap-0.5 transition-colors items-center"
      :class="isActive(tab.path) ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'"
    >
      <div class="text-xl" :class="tab.icon" />
      <span>{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>
