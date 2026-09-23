<script setup lang="ts">
  const { icon = 'i-carbon-archive', text = '暂无内容' } = defineProps<{
    icon?: string
    text?: string
  }>()
</script>

<template>
  <div class="text-sm text-gray-400 py-16 flex flex-col gap-3 items-center">
    <div class="text-5xl opacity-50" :class="[icon]" />
    <p>{{ text }}</p>
    <slot />
  </div>
</template>
