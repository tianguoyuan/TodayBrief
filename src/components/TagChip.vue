<script setup lang="ts">
  defineProps<{
    to: string
    text: string
  }>()
</script>

<template>
  <RouterLink
    class="text-xs px-3 py-1 rounded-full bg-white shrink-0 shadow-sm transition-colors hover:text-orange-500 dark:bg-gray-800"
    :to="to"
  >
    {{ text }}
  </RouterLink>
</template>
