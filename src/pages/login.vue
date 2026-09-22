<script setup lang="ts">
import { user } from '~/composables/user'

usePageTitle('登录')

const router = useRouter()

const form = reactive({
  account: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

function submit() {
  if (loading.value)
    return
  if (!form.account.trim()) {
    errorMessage.value = '请输入账号'
    return
  }
  if (!form.password) {
    errorMessage.value = '请输入密码'
    return
  }
  errorMessage.value = ''
  loading.value = true
  setTimeout(() => {
    user.value = {
      ...user.value,
      loggedIn: true,
      nickname: form.account.trim(),
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
        <h2 class="text-lg font-bold">
          欢迎回来
        </h2>
        <p class="text-xs text-gray-400 mt-1">
          登录今日快讯，开启资讯之旅
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-user text-lg text-gray-400" />
          <input
            v-model="form.account"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            placeholder="手机号 / 用户名"
          >
        </div>
        <div class="px-3 py-2.5 rounded-xl bg-gray-100 flex gap-2 items-center dark:bg-gray-700">
          <div class="i-carbon-locked text-lg text-gray-400" />
          <input
            v-model="form.password"
            type="password"
            class="text-sm outline-none bg-transparent flex-1 min-w-0 placeholder:text-gray-400"
            placeholder="密码"
          >
        </div>

        <p v-if="errorMessage" class="text-xs text-red-500">
          {{ errorMessage }}
        </p>

        <button type="submit" class="btn py-2.5 w-full justify-center" :disabled="loading">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </form>

      <p class="text-xs text-gray-400 mt-4 text-center">
        演示应用：输入任意账号密码即可登录
      </p>
    </div>

    <p class="text-xs text-gray-400 mt-4 text-center">
      还没有账号？
      <RouterLink to="/register" class="text-orange-500">
        立即注册
      </RouterLink>
    </p>
  </div>
</template>
