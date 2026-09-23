<script setup lang="ts">
  import { user } from '~/composables/user'

  usePageTitle('编辑资料')

  const router = useRouter()

  const form = reactive({
    bio: user.value.bio,
    nickname: user.value.nickname,
  })

  const saving = ref(false)
  const saved = ref(false)

  function save() {
    if (saving.value) return
    const nickname = form.nickname.trim() || '今日快讯用户'
    saving.value = true
    setTimeout(() => {
      user.value = {
        ...user.value,
        bio: form.bio.trim(),
        nickname,
      }
      saved.value = true
      setTimeout(() => {
        router.push('/me')
      }, 400)
    }, 500)
  }
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="py-6 flex flex-col gap-3 items-center">
      <Avatar :char="(form.nickname || '快').charAt(0)" size="xl" />
      <p class="text-xs text-gray-400">头像预览，将自动取昵称首字</p>
    </div>

    <div class="p-5 rounded-2xl bg-white shadow-sm dark:bg-gray-800">
      <label class="text-xs text-gray-400 mb-1.5 block">昵称</label>
      <input
        v-model="form.nickname"
        class="text-sm px-3 py-2.5 outline-none rounded-xl bg-gray-100 w-full dark:bg-gray-700"
        maxlength="16"
        placeholder="请输入昵称"
      />

      <label class="text-xs text-gray-400 mb-1.5 mt-4 block">个人简介</label>
      <textarea
        v-model="form.bio"
        class="text-sm px-3 py-2.5 outline-none rounded-xl bg-gray-100 w-full resize-none dark:bg-gray-700"
        maxlength="60"
        placeholder="介绍一下自己吧"
        rows="3"
      />

      <p v-if="saved" class="text-xs text-green-500 mt-3">保存成功，即将返回...</p>

      <button class="btn mt-5 py-2.5 w-full justify-center" :disabled="saving" @click="save">
        {{ saving ? '保存中...' : '保存资料' }}
      </button>
    </div>
  </div>
</template>
