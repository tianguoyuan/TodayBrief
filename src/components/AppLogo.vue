<script setup lang="ts">
  withDefaults(
    defineProps<{
      size?: 'md' | 'lg'
    }>(),
    {
      size: 'md',
    },
  )
</script>

<template>
  <div
    class="text-white font-bold rounded-2xl flex shrink-0 shadow-lg items-center justify-center from-orange-500 to-pink-500 bg-gradient-to-br"
    :class="size === 'lg' ? 'h-16 w-16 text-2xl' : 'h-14 w-14 text-2xl'"
  >
    快
  </div>
</template>
