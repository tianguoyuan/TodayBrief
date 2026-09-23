<script setup lang="ts">
  import type { AppMessage } from '~/composables/messages'
  import { appMessages, clearMessages, isMessageRead, markAllRead, markRead, unreadCount } from '~/composables/messages'

  usePageTitle('消息')

  const router = useRouter()

  const clearConfirm = ref(false)

  const typeMeta: Record<string, { icon: string; color: string }> = {
    follow: { color: 'text-teal-500', icon: 'i-carbon-user' },
    like: { color: 'text-pink-500', icon: 'i-carbon-thumbs-up' },
    reply: { color: 'text-blue-500', icon: 'i-carbon-chat' },
    system: { color: 'text-orange-500', icon: 'i-carbon-information' },
  }

  function isRead(id: string) {
    return isMessageRead(id)
  }

  function openMessage(message: AppMessage) {
    markRead(message.id)
    if (message.newsId) router.push(`/news/${message.newsId}`)
    else if (message.username) router.push(`/user/${message.username}`)
  }

  function confirmClear() {
    clearMessages()
    clearConfirm.value = false
  }
</script>

<template>
  <div class="p-4">
    <div v-if="appMessages.length" class="mb-3 px-1 flex items-center justify-between">
      <h2 class="text-base font-bold">
        通知中心
        <span
          v-if="unreadCount"
          class="text-[10px] text-white ml-1 px-1.5 py-0.5 align-middle rounded-full bg-orange-500"
        >
          {{ unreadCount }}
        </span>
      </h2>
      <div class="flex gap-3 items-center">
        <button
          v-if="unreadCount"
          class="text-xs text-gray-400 transition-colors hover:text-orange-500"
          @click="markAllRead"
        >
          全部已读
        </button>
        <button class="text-xs text-gray-400 transition-colors hover:text-red-500" @click="clearConfirm = true">
          清空
        </button>
      </div>
    </div>

    <div v-if="appMessages.length" class="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800">
      <button
        v-for="message in appMessages"
        :key="message.id"
        class="px-3 py-3 text-left border-b border-gray-100 flex gap-3 transition-colors items-start last:border-0 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        @click="openMessage(message)"
      >
        <div
          class="rounded-full bg-gray-100 flex shrink-0 h-9 w-9 items-center justify-center dark:bg-gray-700/60"
          :class="typeMeta[message.type]?.color ?? 'text-gray-400'"
        >
          <div class="text-lg" :class="typeMeta[message.type]?.icon ?? 'i-carbon-email'" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex gap-2 items-center">
            <p
              class="text-sm font-medium"
              :class="isRead(message.id) ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'"
            >
              {{ message.title }}
            </p>
            <span v-if="!isRead(message.id)" class="rounded-full bg-orange-500 shrink-0 h-1.5 w-1.5" />
          </div>
          <p v-if="message.desc" class="text-xs text-gray-400 mt-1 line-clamp-2 dark:text-gray-500">
            {{ message.desc }}
          </p>
          <p class="text-xs text-gray-300 mt-1 dark:text-gray-600">
            {{ message.time }}
          </p>
        </div>
      </button>
    </div>

    <EmptyState v-else icon="i-carbon-notification" text="暂时没有新消息">
      <RouterLink class="btn" to="/">去首页</RouterLink>
    </EmptyState>

    <AppDialog :open="clearConfirm" title="清空消息" @close="clearConfirm = false">
      <p class="text-sm text-gray-500 leading-6 dark:text-gray-400">
        确定要清空全部 {{ appMessages.length }} 条消息吗？
      </p>
      <div class="mt-4 flex gap-3">
        <button
          class="btn flex-1 !text-gray-700 !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-700 hover:!bg-gray-300 dark:hover:!bg-gray-600"
          @click="clearConfirm = false"
        >
          取消
        </button>
        <button class="btn flex-1 !bg-red-500 hover:!bg-red-600" @click="confirmClear">确定清空</button>
      </div>
    </AppDialog>
  </div>
</template>
