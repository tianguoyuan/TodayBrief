<script setup lang="ts">
const props = withDefaults(defineProps<{
  char: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: [string, string]
}>(), {
  size: 'md',
})

const sizeClass = computed(() => ({
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-14 w-14 text-2xl',
  xl: 'h-20 w-20 text-3xl',
}[props.size]))

const background = computed(() => props.gradient
  ? { background: `linear-gradient(135deg, ${props.gradient[0]}, ${props.gradient[1]})` }
  : {})
</script>

<template>
  <div
    class="text-white font-medium rounded-full flex shrink-0 items-center justify-center from-orange-500 to-pink-500 bg-gradient-to-br"
    :class="sizeClass"
    :style="background"
  >
    {{ char || '快' }}
  </div>
</template>
