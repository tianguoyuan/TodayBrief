<script setup lang="ts">
const route = useRoute()
const tabPaths = ['/', '/hot', '/favorites', '/me']
const showBack = computed(() => !tabPaths.includes(route.path))
const isSearch = computed(() => route.path === '/search')

function goBack() {
  history.back()
}
</script>

<template>
  <header class="px-4 border-b border-gray-200/70 bg-white/90 flex h-14 items-center top-0 justify-between relative sticky z-10 backdrop-blur dark:border-gray-700/70 dark:bg-gray-900/90">
    <span class="flex h-14 pointer-events-none items-center inset-x-4 top-0 justify-center absolute">
      <h1 class="text-base tracking-wide font-bold max-w-48 truncate">
        {{ pageTitle }}
      </h1>
    </span>
    <div class="flex flex-1 gap-2 min-w-0 items-center">
      <button v-if="showBack" class="icon-btn text-xl" title="返回" @click="goBack">
        <div class="i-carbon-arrow-left" />
      </button>
    </div>
    <div class="flex gap-3 items-center">
      <RouterLink v-if="!isSearch" to="/search" class="icon-btn text-xl" title="搜索">
        <div class="i-carbon-search" />
      </RouterLink>
      <button class="icon-btn text-xl" title="切换主题" @click="() => toggleDark()">
        <div class="i-carbon-moon dark:i-carbon-sun" />
      </button>
    </div>
  </header>
</template>
