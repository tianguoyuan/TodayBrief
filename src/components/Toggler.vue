<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    class="rounded-full h-6 w-11 transition-colors relative"
    :class="modelValue ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'"
    :aria-label="label ?? (modelValue ? '关闭' : '开启')"
    @click="toggle"
  >
    <span
      class="rounded-full bg-white h-5 w-5 shadow transition-transform top-0.5 absolute"
      :class="modelValue ? 'left-[22px]' : 'left-0.5'"
    />
  </button>
</template>
