<script setup lang="ts">
import type { FontScale } from '~/composables/settings'
import { likedCommentIds } from '~/composables/comment-likes'
import { clearFavorites, favoriteIds } from '~/composables/favorites'
import { followedUsers } from '~/composables/follows'
import { clearHistory, historyIds } from '~/composables/history'
import { appMessages, clearMessages, readMessageIds } from '~/composables/messages'
import { fontSize, notificationsEnabled } from '~/composables/settings'
import { user } from '~/composables/user'
import { APP_VERSION } from '~/utils/constants'

usePageTitle('设置')

const clearConfirm = ref(false)
const cleared = ref(false)

const darkMode = computed({
  get: () => isDark.value,
  set: (value: boolean) => toggleDark(value),
})

const fontOptions: Array<{ value: FontScale, label: string }> = [
  { value: 'sm', label: '小' },
  { value: 'md', label: '标准' },
  { value: 'lg', label: '大' },
]

function confirmClear() {
  clearFavorites()
  clearHistory()
  clearMessages()
  likedCommentIds.value = []
  readMessageIds.value = []
  followedUsers.value = []
  fontSize.value = 'md'
  notificationsEnabled.value = true
  user.value = {
    loggedIn: false,
    nickname: '今日快讯用户',
    bio: '关注科技 · 热爱生活',
  }
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('vue-news:') || key === 'vueuse-color-scheme')
      localStorage.removeItem(key)
  }
  clearConfirm.value = false
  cleared.value = true
  setTimeout(() => {
    window.location.reload()
  }, 900)
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="p-4 rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <div class="px-1 py-2 flex items-center justify-between">
        <div class="text-sm flex gap-3 items-center">
          <div class="i-carbon-moon text-lg text-gray-400" />
          <span>深色模式</span>
        </div>
        <Toggler v-model="darkMode" label="深色模式" />
      </div>

      <div class="px-1 py-2 flex items-center justify-between">
        <div class="text-sm flex gap-3 items-center">
          <div class="i-carbon-notification text-lg text-gray-400" />
          <span>接收通知</span>
        </div>
        <Toggler v-model="notificationsEnabled" label="接收通知" />
      </div>

      <div class="px-1 py-2">
        <div class="text-sm flex gap-3 items-center">
          <div class="i-carbon-text-scale text-lg text-gray-400" />
          <span>字体大小</span>
        </div>
        <div class="mt-2 p-1 rounded-xl bg-gray-100 flex gap-1 dark:bg-gray-700">
          <button
            v-for="option in fontOptions"
            :key="option.value"
            class="text-xs py-1.5 text-center rounded-lg flex-1 transition-colors"
            :class="fontSize === option.value ? 'bg-white text-orange-500 font-medium shadow-sm dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400'"
            @click="fontSize = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="rounded-xl bg-white shadow-sm overflow-hidden divide-gray-100 divide-y dark:bg-gray-800 dark:divide-gray-700">
      <button class="text-sm px-4 py-3.5 flex w-full items-center justify-between" @click="clearConfirm = true">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-delete text-lg text-gray-400" />
          <span>清除缓存数据</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </button>

      <RouterLink to="/about" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-information text-lg text-gray-400" />
          <span>关于今日快讯</span>
        </div>
        <span class="text-xs text-gray-400 flex gap-1 items-center">
          {{ APP_VERSION }}
          <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
        </span>
      </RouterLink>
    </div>

    <div class="px-4 py-3.5 rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <p class="text-xs text-gray-400 leading-6 dark:text-gray-500">
        缓存数据包含收藏 {{ favoriteIds.length }} 条、阅读历史 {{ historyIds.length }} 条、消息 {{ appMessages.length }} 条、关注 {{ followedUsers.length }} 个、登录状态等，全部仅保存在本机。
      </p>
    </div>

    <p v-if="cleared" class="text-xs text-green-500 text-center">
      <span class="i-carbon-checkmark align-text-bottom inline-block" /> 缓存数据已清除，已恢复默认设置
    </p>

    <AppDialog :open="clearConfirm" title="清除缓存" @close="clearConfirm = false">
      <p class="text-sm text-gray-500 leading-6 dark:text-gray-400">
        将清空收藏、阅读历史、消息、关注、登录状态等全部本地数据，此操作无法撤销。
      </p>
      <div class="mt-4 flex gap-3">
        <button class="btn flex-1 !text-gray-700 !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-700 hover:!bg-gray-300 dark:hover:!bg-gray-600" @click="clearConfirm = false">
          取消
        </button>
        <button class="btn flex-1 !bg-red-500 hover:!bg-red-600" @click="confirmClear">
          确定清除
        </button>
      </div>
    </AppDialog>
  </div>
</template>
