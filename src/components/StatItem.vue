<script setup lang="ts">
withDefaults(defineProps<{
  value: string | number
  label: string
  highlight?: boolean
}>(), {
  highlight: false,
})
</script>

<template>
  <div class="py-4 text-center">
    <p class="text-lg font-bold" :class="highlight ? 'text-orange-500' : ''">
      {{ value }}
    </p>
    <p class="text-xs text-gray-400 mt-0.5">
      {{ label }}
    </p>
  </div>
</template>
