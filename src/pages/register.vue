<script setup lang="ts">
  import { user } from '~/composables/user'

  usePageTitle('注册')

  const router = useRouter()

  const form = reactive({
    account: '',
    confirm: '',
    nickname: '',
    password: '',
  })

  const errorMessage = ref('')
  const loading = ref(false)

  function submit() {
    if (loading.value) return
    const nickname = form.nickname.trim()
    const account = form.account.trim()
    if (!nickname) {
      errorMessage.value = '请输入昵称'
      return
    }
    if (!account) {
      errorMessage.value = '请输入账号'
      return
    }
    if (!form.password) {
      errorMessage.value = '请输入密码'
      return
    }
    if (form.password !== form.confirm) {
      errorMessage.value = '两次输入的密码不一致'
      return
    }
    errorMessage.value = ''
    loading.value = true
    setTimeout(() => {
      user.value = {
        bio: '今天开始使用今日快讯',
        loggedIn: true,
        nickname,
      }
      router.push('/me')
    }, 800)
  }
</script>

<template>
  <div class="px-4 flex flex-col min-h-[calc(100vh-3.5rem)] justify-center">
    <div class="p-6 rounded-2xl bg-white shadow-sm dark:bg-gray-800">
      <div class="mb-6 text-center">
        <AppLogo class="mx-auto mb-3" />
        <h2 class="text-lg font-bold">创建账号</h2>
        <p class="text-xs text-gray-400 mt-1">注册今日快讯，解锁更多玩法</p>
      </div>

      <form class="space-y-3.5" @submit.prevent="submit">
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-user text-lg text-gray-400" />
          <input
            v-model="form.nickname"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            maxlength="16"
            placeholder="昵称"
          />
        </div>
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-mobile text-lg text-gray-400" />
          <input
            v-model="form.account"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            placeholder="手机号 / 用户名"
          />
        </div>
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-locked text-lg text-gray-400" />
          <input
            v-model="form.password"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            placeholder="密码"
            type="password"
          />
        </div>
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-locked text-lg text-gray-400" />
          <input
            v-model="form.confirm"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            placeholder="确认密码"
            type="password"
            @keyup.enter="submit"
          />
        </div>

        <p v-if="errorMessage" class="text-xs text-red-500">
          {{ errorMessage }}
        </p>

        <button class="btn py-2.5 w-full justify-center" :disabled="loading" type="submit">
          {{ loading ? '注册中...' : '注 册' }}
        </button>
      </form>

      <p class="text-xs text-gray-400 mt-4 text-center">演示应用：填写任意信息即可注册</p>
    </div>

    <p class="text-xs text-gray-400 mt-4 text-center">
      已有账号？
      <RouterLink class="text-orange-500" to="/login">去登录</RouterLink>
    </p>
  </div>
</template>
