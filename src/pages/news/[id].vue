<script setup lang="ts">
import type { Comment } from '~/data/comments'
import { likedCommentIds } from '~/composables/comment-likes'
import { addHistory } from '~/composables/history'
import { user } from '~/composables/user'
import { getComments } from '~/data/comments'
import { allNews, categories } from '~/data/news'

const route = useRoute()
const routeParams = route.params as Record<string, string>

const item = computed(() => allNews.find(news => news.id === routeParams.id) ?? allNews[0])

usePageTitle(() => item.value.title)

const paragraphs = computed(() => item.value.content.split('\n'))

const categoryLabel = computed(() => categories.find(c => c.id === item.value.category)?.label ?? '')

const gradient = computed(() => `linear-gradient(135deg, ${item.value.gradient[0]}, ${item.value.gradient[1]})`)

const comments = ref<Comment[]>(getComments(item.value.id))
const newComment = ref('')
const submitting = ref(false)

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
  const liked = likedCommentIds.value.includes(id)
  target.likes += liked ? -1 : 1
  likedCommentIds.value = liked
    ? likedCommentIds.value.filter(commentId => commentId !== id)
    : [...likedCommentIds.value, id]
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
  </article>
</template>
