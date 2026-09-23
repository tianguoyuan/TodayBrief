<script setup lang="ts">
  usePageTitle('页面不存在')
</script>

<template>
  <div class="px-4 text-center flex flex-col gap-4 min-h-70vh items-center justify-center">
    <div class="i-carbon-warning text-5xl text-orange-400" />
    <p class="text-sm text-gray-400">页面不存在或已下线</p>
    <RouterLink class="btn" to="/">返回首页</RouterLink>
  </div>
</template>
