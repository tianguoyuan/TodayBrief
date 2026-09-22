<script setup lang="ts">
import { clearFavorites, favoriteIds } from '~/composables/favorites'
import { followedUsers } from '~/composables/follows'
import { historyIds } from '~/composables/history'
import { unreadCount } from '~/composables/messages'
import { user } from '~/composables/user'

usePageTitle('我的')

const favCount = computed(() => favoriteIds.value.length)
const readingCount = computed(() => historyIds.value.length)
const followCount = computed(() => followedUsers.value.length)

const clearConfirm = ref(false)
const logoutConfirm = ref(false)

const nickname = computed(() => user.value.nickname || '今日快讯用户')
const bio = computed(() => user.value.bio || '关注科技 · 热爱生活')

const darkMode = computed({
  get: () => isDark.value,
  set: (value: boolean) => toggleDark(value),
})

function confirmClear() {
  clearFavorites()
  clearConfirm.value = false
}

function confirmLogout() {
  user.value = { ...user.value, loggedIn: false }
  logoutConfirm.value = false
}
</script>

<template>
  <div>
    <div class="text-white p-5 flex gap-4 items-center from-orange-500 to-pink-500 bg-gradient-to-r">
      <div class="text-2xl font-bold rounded-full bg-white/20 flex shrink-0 h-16 w-16 items-center justify-center backdrop-blur">
        {{ nickname.charAt(0) }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex gap-2 items-center">
          <p class="text-lg font-bold truncate">
            {{ nickname }}
          </p>
          <span class="text-xs px-2 py-0.5 rounded-full bg-white/20 shrink-0">
            {{ user.loggedIn ? '已登录' : '未登录' }}
          </span>
        </div>
        <p class="text-xs text-white/80 mt-1 truncate">
          {{ bio }}
        </p>
      </div>
      <RouterLink
        :to="user.loggedIn ? '/profile' : '/login'"
        class="text-xs px-3 py-1 border border-white/40 rounded-full shrink-0 transition-colors hover:bg-white/20"
      >
        {{ user.loggedIn ? '编辑资料' : '登录' }}
      </RouterLink>
    </div>

    <div class="mx-4 mt-4 py-4 text-center rounded-xl bg-white grid grid-cols-3 shadow-sm divide-gray-100 divide-x dark:bg-gray-800 dark:divide-gray-700">
      <StatItem :value="favCount" label="收藏" highlight />
      <StatItem :value="readingCount" label="阅读" />
      <StatItem :value="followCount" label="关注话题" />
    </div>

    <div class="mx-4 mt-4 rounded-xl bg-white shadow-sm overflow-hidden divide-gray-100 divide-y dark:bg-gray-800 dark:divide-gray-700">
      <div class="px-4 py-3.5 flex items-center justify-between">
        <div class="text-sm flex gap-3 items-center">
          <div class="i-carbon-moon text-lg text-gray-400" />
          <span>深色模式</span>
        </div>
        <Toggler v-model="darkMode" />
      </div>

      <RouterLink to="/favorites" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-favorite text-lg text-gray-400" />
          <span>我的收藏</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </RouterLink>

      <RouterLink to="/history" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-history text-lg text-gray-400" />
          <span>阅读历史</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </RouterLink>

      <RouterLink to="/messages" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-notification text-lg text-gray-400" />
          <span>消息通知</span>
        </div>
        <span v-if="unreadCount" class="text-[10px] text-white px-1.5 py-0.5 rounded-full bg-orange-500">
          {{ unreadCount }}
        </span>
        <div v-else class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </RouterLink>

      <RouterLink to="/settings" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-settings text-lg text-gray-400" />
          <span>设置</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </RouterLink>

      <button class="text-sm px-4 py-3.5 text-left flex w-full items-center justify-between" @click="clearConfirm = true">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-trash-can text-lg text-gray-400" />
          <span>清除全部收藏</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </button>

      <button v-if="user.loggedIn" class="text-sm px-4 py-3.5 text-left flex w-full items-center justify-between" @click="logoutConfirm = true">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-logout text-lg text-gray-400" />
          <span>退出登录</span>
        </div>
        <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
      </button>

      <RouterLink to="/about" class="text-sm px-4 py-3.5 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="i-carbon-information text-lg text-gray-400" />
          <span>关于今日快讯</span>
        </div>
        <span class="text-xs text-gray-400 flex gap-1 items-center">
          v1.1.0
          <div class="i-carbon-chevron-right text-gray-300 dark:text-gray-600" />
        </span>
      </RouterLink>
    </div>

    <p class="text-xs text-gray-400 px-6 py-6 text-center">
      今日快讯 · 只为更快看到世界
    </p>

    <AppDialog :open="clearConfirm" title="清除收藏" @close="clearConfirm = false">
      <p class="text-sm text-gray-500 leading-6 dark:text-gray-400">
        确定要清空全部 {{ favCount }} 条收藏吗？此操作无法撤销。
      </p>
      <div class="mt-4 flex gap-3">
        <button class="btn flex-1 !text-gray-700 !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-700 hover:!bg-gray-300 dark:hover:!bg-gray-600" @click="clearConfirm = false">
          取消
        </button>
        <button class="btn flex-1 !bg-red-500 hover:!bg-red-600" @click="confirmClear">
          确定清空
        </button>
      </div>
    </AppDialog>

    <AppDialog :open="logoutConfirm" title="退出登录" @close="logoutConfirm = false">
      <p class="text-sm text-gray-500 leading-6 dark:text-gray-400">
        确定要退出当前账号吗？退出后将无法同步「收藏」等数据。
      </p>
      <div class="mt-4 flex gap-3">
        <button class="btn flex-1 !text-gray-700 !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-700 hover:!bg-gray-300 dark:hover:!bg-gray-600" @click="logoutConfirm = false">
          取消
        </button>
        <button class="btn flex-1 !bg-red-500 hover:!bg-red-600" @click="confirmLogout">
          确认退出
        </button>
      </div>
    </AppDialog>
  </div>
</template>
