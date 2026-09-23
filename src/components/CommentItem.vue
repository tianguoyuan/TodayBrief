<script setup lang="ts">
  import type { Comment } from '~/data/comments'
  import { isLiked } from '~/composables/comment-likes'

  const { comment, rootId } = defineProps<{
    comment: Comment
    rootId: string
  }>()

  const emit = defineEmits<{
    like: [id: string]
    reply: [rootId: string, targetId: string, text: string]
  }>()

  const showReply = ref(false)
  const replyText = ref('')
  const liked = computed(() => isLiked(comment.id))

  function toggleLike() {
    emit('like', comment.id)
  }

  function submitReply() {
    const text = replyText.value.trim()
    if (!text) return
    emit('reply', rootId, comment.id, text)
    replyText.value = ''
    showReply.value = false
  }
</script>

<template>
  <div class="flex gap-3">
    <Avatar :char="comment.username.charAt(0)" :gradient="comment.avatar" />
    <div class="flex-1 min-w-0">
      <p class="text-xs text-gray-400">
        {{ comment.username }}
      </p>
      <p class="text-sm text-gray-700 leading-6 mt-1 dark:text-gray-300">
        <span v-if="comment.replyTo" class="text-orange-500">回复 {{ comment.replyTo }}：</span>
        {{ comment.content }}
      </p>
      <div class="text-xs text-gray-400 mt-1.5 flex gap-4 items-center">
        <span>{{ comment.time }}</span>
        <button
          :aria-label="liked ? '取消点赞' : '点赞'"
          class="flex gap-1 transition-colors items-center"
          :class="liked ? 'text-orange-500' : 'hover:text-gray-600'"
          type="button"
          @click="toggleLike"
        >
          <div class="i-carbon-thumbs-up text-sm" />
          {{ comment.likes }}
        </button>
        <button v-if="showReply" class="text-gray-600 dark:text-gray-300" @click="showReply = false">收起</button>
        <button @click="showReply = true">回复</button>
      </div>
      <div v-if="showReply" class="mt-2 flex gap-2 items-center">
        <input
          v-model="replyText"
          class="text-xs px-3 py-1.5 outline-none rounded-full bg-gray-100 flex-1 min-w-0 dark:bg-gray-700"
          placeholder="回复 {{ comment.username }}..."
          @keyup.enter="submitReply"
        />
        <button class="text-xs btn !px-2.5 !py-0.5 !rounded-full" :disabled="!replyText.trim()" @click="submitReply">
          发送
        </button>
      </div>

      <div v-if="comment.replies.length" class="mt-3 p-3 rounded-xl bg-gray-50 space-y-3 dark:bg-gray-700/40">
        <CommentItem
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          :rootId="rootId"
          @like="(id: string) => emit('like', id)"
          @reply="(root: string, target: string, text: string) => emit('reply', root, target, text)"
        />
      </div>
    </div>
  </div>
</template>
