<script setup lang="ts">
  import { backMode } from '~/composables/settings'

  const route = useRoute()
  const tabPaths = ['/', '/hot', '/favorites', '/me']
  const showBack = computed(() => !tabPaths.includes(route.path))
  const isSearch = computed(() => route.path === '/search')

  function goBack() {
    history.back()
  }
</script>

<template>
  <header
    class="px-4 border-b border-gray-200/70 bg-white/90 flex h-14 items-center top-0 justify-between relative sticky z-10 backdrop-blur dark:border-gray-700/70 dark:bg-gray-900/90"
  >
    <span class="flex h-14 pointer-events-none items-center inset-x-4 top-0 justify-center absolute">
      <h1 class="text-base tracking-wide font-bold max-w-48 truncate">
        {{ pageTitle }}
      </h1>
    </span>
    <div class="flex flex-1 gap-2 min-w-0 items-center">
      <template v-if="showBack">
        <nav
          v-if="backMode === 'capsule'"
          aria-label="返回与首页"
          class="leading-none rounded-full bg-gray-100 flex items-center overflow-hidden dark:bg-gray-700/60"
        >
          <button
            aria-label="返回"
            class="text-lg px-2.5 py-1.5 transition-colors hover:bg-gray-200/70 dark:hover:bg-gray-600/50"
            title="返回"
            type="button"
            @click="goBack"
          >
            <div class="i-carbon-arrow-left" />
          </button>
          <div class="bg-gray-300/60 h-4 w-px dark:bg-gray-600" />
          <RouterLink
            aria-label="回到首页"
            class="text-lg px-2.5 py-1.5 transition-colors hover:bg-gray-200/70 dark:hover:bg-gray-600/50"
            title="回到首页"
            to="/"
          >
            <div class="i-carbon-home" />
          </RouterLink>
        </nav>
        <button v-else aria-label="返回" class="icon-btn text-xl" title="返回" type="button" @click="goBack">
          <div class="i-carbon-arrow-left" />
        </button>
      </template>
    </div>
    <div class="flex gap-3 items-center">
      <RouterLink v-if="!isSearch" class="icon-btn text-xl" title="搜索" to="/search">
        <div class="i-carbon-search" />
      </RouterLink>
      <button aria-label="切换主题" class="icon-btn text-xl" title="切换主题" type="button" @click="() => toggleDark()">
        <div class="i-carbon-moon dark:i-carbon-sun" />
      </button>
    </div>
  </header>
</template>
