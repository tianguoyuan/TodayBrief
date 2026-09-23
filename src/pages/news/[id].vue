<script setup lang="ts">
import type { Comment } from '~/data/comments'
import { isLiked, toggleLiked } from '~/composables/comment-likes'
import { addHistory } from '~/composables/history'
import { user } from '~/composables/user'
import { getComments } from '~/data/comments'
import { allNews, categoryById, newsById } from '~/data/news'

const route = useRoute('/news/[id]')

const item = computed(() => newsById.get(route.params.id) ?? allNews[0])

usePageTitle(() => item.value.title)

const paragraphs = computed(() => item.value.content.split('\n'))

const categoryLabel = computed(() => categoryById.get(item.value.category)?.label ?? '')

const gradient = computed(() => `linear-gradient(135deg, ${item.value.gradient[0]}, ${item.value.gradient[1]})`)

const comments = ref<Comment[]>(getComments(item.value.id))
const newComment = ref('')
const submitting = ref(false)
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})

const related = computed(() =>
  allNews.filter(entry => entry.id !== item.value.id && entry.category === item.value.category).slice(0, 3),
)

watch(item, () => {
  comments.value = getComments(item.value.id)
  addHistory(item.value.id)
}, { immediate: true })

function findComment(id: string): Comment | undefined {
  for (const comment of comments.value) {
    if (comment.id === id)
      return comment
    const reply = comment.replies.find(reply => reply.id === id)
    if (reply)
      return reply
  }
  return undefined
}

function toggleCommentLike(id: string) {
  const target = findComment(id)
  if (!target)
    return
  target.likes += isLiked(id) ? -1 : 1
  toggleLiked(id)
}

function addReply(rootId: string, targetId: string, text: string) {
  const root = comments.value.find(comment => comment.id === rootId)
  if (!root)
    return
  const target = root.id === targetId ? root : root.replies.find(reply => reply.id === targetId)
  if (!target)
    return
  const reply: Comment = {
    id: `reply-${Date.now()}`,
    username: user.value.nickname,
    avatar: ['#F97316', '#EC4899'],
    time: '刚刚',
    content: text,
    likes: 0,
    replies: [],
  }
  if (target.id !== root.id)
    reply.replyTo = target.username
  root.replies.push(reply)
}

function submitComment() {
  const text = newComment.value.trim()
  if (!text || submitting.value)
    return
  submitting.value = true
  setTimeout(() => {
    comments.value.unshift({
      id: `new-${Date.now()}`,
      username: user.value.nickname,
      avatar: ['#F97316', '#EC4899'],
      time: '刚刚',
      content: text,
      likes: 0,
      replies: [],
    })
    newComment.value = ''
    submitting.value = false
  }, 300)
}
</script>

<template>
  <article class="px-4 pb-8 pt-3 min-h-screen">
    <div v-if="loading" class="space-y-4">
      <div class="skeleton rounded-xl h-48" />
      <div class="skeleton h-4 w-2/3" />
      <div class="skeleton h-3 w-1/3" />
      <div class="pt-2 space-y-2.5">
        <div class="skeleton h-3" />
        <div class="skeleton h-3" />
        <div class="skeleton h-3 w-3/4" />
        <div class="skeleton h-3" />
        <div class="skeleton h-3 w-5/6" />
      </div>
    </div>

    <template v-else>
      <div
        class="p-4 rounded-xl flex h-48 items-end relative overflow-hidden"
        :style="{ background: gradient }"
      >
        <div class="bg-black/20 inset-0 absolute" />
        <div class="relative">
          <span class="text-xs text-white mb-2 px-2.5 py-0.5 rounded-full bg-white/20 inline-block backdrop-blur">
            {{ categoryLabel }} · {{ item.tag }}
          </span>
          <h1 class="text-lg text-white leading-snug font-bold">
            {{ item.title }}
          </h1>
        </div>
      </div>

      <div class="text-xs text-gray-400 mt-4 flex items-center justify-between dark:text-gray-500">
        <span>{{ item.source }} · {{ item.time }}</span>
        <span>{{ item.reads }} 阅读 · 转赞评 {{ item.reads }}</span>
      </div>

      <div class="text-sm text-gray-700 leading-7 mt-4 space-y-4 dark:text-gray-300">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          :class="{ 'font-medium text-gray-900 dark:text-gray-100': index === 0 }"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="mt-5 flex gap-2 items-center">
        <TagChip :to="`/tag/${item.tag}`" :text="`# ${item.tag}`" />
        <TagChip :to="`/category/${item.category}`" :text="categoryLabel" />
      </div>
    </template>

    <section class="mt-6 pt-4 border-t border-gray-200/70 dark:border-gray-700/70">
      <div class="mb-3 px-1 flex gap-2 items-center">
        <h2 class="text-sm font-bold">
          全部评论
        </h2>
        <span class="text-xs text-gray-400">
          {{ comments.length }}
        </span>
      </div>

      <div class="p-2 pl-3 rounded-2xl bg-white flex gap-2 shadow-sm items-center dark:bg-gray-800">
        <Avatar size="sm" :char="(user.nickname || '访').charAt(0)" />
        <input
          v-model="newComment"
          class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
          placeholder="写下你的观点..."
          @keyup.enter="submitComment"
        >
        <button
          class="text-xs btn !px-3 !py-1 !rounded-full"
          :disabled="!newComment.trim() || submitting"
          @click="submitComment"
        >
          {{ submitting ? '发布中' : '发布' }}
        </button>
      </div>

      <div class="mt-4 space-y-4">
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :root-id="comment.id"
          @like="toggleCommentLike"
          @reply="addReply"
        />
      </div>
    </section>

    <section v-if="related.length" class="mt-8 pt-4 border-t border-gray-200/70 dark:border-gray-700/70">
      <div class="mb-3 px-1 flex gap-2 items-center">
        <h2 class="text-sm font-bold">
          相关推荐
        </h2>
        <span class="text-xs text-gray-400">
          {{ related.length }} 篇
        </span>
      </div>
      <div class="space-y-2">
        <RouterLink
          v-for="entry in related"
          :key="entry.id"
          :to="`/news/${entry.id}`"
          class="p-3 rounded-xl bg-white flex gap-3 shadow-sm transition-colors items-center dark:bg-gray-800 hover:shadow-md"
        >
          <div
            class="p-1.5 rounded-lg flex shrink-0 flex-col h-14 w-20 justify-between overflow-hidden"
            :style="{ background: `linear-gradient(135deg, ${entry.gradient[0]}, ${entry.gradient[1]})` }"
          >
            <span class="text-[10px] text-white/90 leading-tight font-medium line-clamp-2">
              {{ entry.tag }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm leading-snug font-medium line-clamp-2">
              {{ entry.title }}
            </h3>
            <p class="text-xs text-gray-400 mt-1 dark:text-gray-500">
              {{ entry.reads }} 阅读
            </p>
          </div>
        </RouterLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.skeleton {
  border-radius: 0.5rem;
  background-color: rgb(229 231 235);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.dark .skeleton {
  background-color: rgb(55 65 81);
}

@keyframes skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}
</style>
