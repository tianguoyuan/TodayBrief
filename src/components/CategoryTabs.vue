<script setup lang="ts">
  import { categories } from '~/data/news'

  defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()
</script>

<template>
  <div
    class="px-4 py-2 border-b border-gray-200/70 bg-gray-100/90 flex gap-1 top-14 sticky z-10 overflow-x-auto backdrop-blur dark:border-gray-700/70 dark:bg-gray-900/90"
  >
    <button
      v-for="item in categories"
      :key="item.id"
      class="text-sm px-3.5 py-1.5 rounded-full shrink-0 transition-colors"
      :class="
        modelValue === item.id
          ? 'bg-orange-500 font-medium text-white'
          : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100'
      "
      @click="emit('update:modelValue', item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
