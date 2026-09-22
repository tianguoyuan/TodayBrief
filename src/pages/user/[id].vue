<script setup lang="ts">
import type { Comment } from '~/data/comments'
import type { NewsItem } from '~/data/news'
import { followedUsers, toggleFollowUser } from '~/composables/follows'
import { user } from '~/composables/user'
import { getComments } from '~/data/comments'
import { allNews } from '~/data/news'
import { hashString } from '~/utils/hash'
import { avatarPalettes } from '~/utils/palettes'

const route = useRoute()
const routeParams = route.params as Record<string, string>

const username = computed(() => decodeURIComponent(routeParams.id ?? ''))

usePageTitle(() => `${username.value} 的主页`)

const bios = [
  '科技资讯爱好者，每天醒来先看世界。',
  '喜欢运动与美食，也爱琢磨财经里的门道。',
  '影视剧与综艺双修，分享最有料的娱乐内容。',
  '环球见闻记录者，用资讯丈量世界。',
  '勤于思考，乐于分享，把好内容转给你。',
]

const seed = computed(() => hashString(username.value))

const gradient = computed(() => avatarPalettes[seed.value % avatarPalettes.length])

const bio = computed(() => {
  const index = (seed.value >> 3) % bios.length
  return bios[index]
})

const followers = computed(() => {
  const value = (seed.value % 8000) + 120
  return value >= 10000 ? `${(value / 10000).toFixed(1)}万` : String(value)
})

const totalLikes = computed(() => {
  const value = (seed.value % 26000) + 500
  return value >= 10000 ? `${(value / 10000).toFixed(1)}万` : String(value)
})

const isSelf = computed(() => user.value.loggedIn && user.value.nickname === username.value)

const isFollowing = computed(() => followedUsers.value.includes(username.value))

const published = computed(() => {
  const start = seed.value % allNews.length
  const counts = [0, 3, 7]
  const list: NewsItem[] = []
  for (const offset of counts) {
    const item = allNews[(start + offset) % allNews.length]
    if (!list.includes(item))
      list.push(item)
  }
  return list
})

const userComments = computed(() => {
  const list: Array<{ item: NewsItem, comment: Comment }> = []
  for (const news of allNews.slice(0, 8)) {
    if (list.length >= 5)
      break
    const comment = getComments(news.id).find(item => item.username === username.value)
    if (!comment)
      continue
    list.push({ item: news, comment })
  }
  return list
})
</script>

<template>
  <div class="pb-6">
    <div class="text-white p-5 flex gap-4 items-center" :style="{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }">
      <Avatar size="xl" :char="username.charAt(0)" :gradient="gradient" />
      <div class="flex-1 min-w-0">
        <div class="flex gap-2 items-center">
          <p class="text-lg font-bold truncate">
            {{ username }}
          </p>
          <span v-if="isSelf" class="text-xs px-2 py-0.5 rounded-full bg-white/20 shrink-0">
            这是你
          </span>
        </div>
        <p class="text-xs text-white/80 mt-1 line-clamp-2">
          {{ bio }}
        </p>
      </div>
      <button
        v-if="!isSelf"
        class="text-xs px-3 py-1 border rounded-full shrink-0 transition-colors"
        :class="isFollowing ? 'border-white bg-white text-gray-800' : 'border-white/40 hover:bg-white/20'"
        @click="toggleFollowUser(username)"
      >
        {{ isFollowing ? '已关注' : '+ 关注' }}
      </button>
    </div>

    <div class="mx-4 mt-4 py-4 text-center rounded-xl bg-white grid grid-cols-3 shadow-sm divide-gray-100 divide-x dark:bg-gray-800 dark:divide-gray-700">
      <StatItem :value="followedUsers.length" label="关注" :highlight="!isSelf" />
      <StatItem :value="followers" label="粉丝" />
      <StatItem :value="totalLikes" label="获赞" />
    </div>

    <div class="mx-4 mt-4">
      <div class="mb-3 px-1 flex items-center justify-between">
        <h2 class="text-base font-bold">
          TA 的发布
        </h2>
        <span class="text-xs text-gray-400">
          {{ published.length }} 篇
        </span>
      </div>
      <NewsList :items="published" featured empty-icon="i-carbon-document" empty-text="TA 还没有发布内容" />
    </div>

    <div class="mx-4 mt-6">
      <div class="mb-3 px-1 flex items-center justify-between">
        <h2 class="text-base font-bold">
          TA 的热门评论
        </h2>
        <span class="text-xs text-gray-400">
          {{ userComments.length }} 条
        </span>
      </div>
      <div v-if="userComments.length" class="rounded-xl bg-white shadow-sm overflow-hidden dark:bg-gray-800">
        <RouterLink
          v-for="(entry, index) in userComments"
          :key="`${entry.item.id}-${index}`"
          :to="`/news/${entry.item.id}`"
          class="px-3 py-3 border-b border-gray-100 flex gap-3 transition-colors items-start last:border-0 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          <div class="text-xs text-gray-400 px-2.5 py-0.5 rounded-full bg-gray-100 shrink-0 dark:bg-gray-700">
            {{ entry.item.tag }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-700 leading-6 line-clamp-2 dark:text-gray-300">
              {{ entry.comment.content }}
            </p>
            <div class="text-xs text-gray-400 mt-1 flex gap-3 items-center dark:text-gray-500">
              <span class="truncate">{{ entry.item.title }}</span>
              <span class="flex shrink-0 gap-1 items-center">
                <span class="i-carbon-thumbs-up text-sm" />
                {{ entry.comment.likes }}
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
      <EmptyState v-else icon="i-carbon-chat" text="TA 还没有发表过评论" />
    </div>
  </div>
</template>
