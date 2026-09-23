<script setup lang="ts">
  defineProps<{
    open: boolean
    title?: string
  }>()

  const emit = defineEmits<{
    close: []
  }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        class="p-6 bg-black/50 flex items-center inset-0 justify-center fixed z-50"
        @click.self="emit('close')"
      >
        <div class="p-5 rounded-2xl bg-white max-w-xs w-full shadow-xl dark:bg-gray-800">
          <h3 v-if="title" class="text-base font-bold">
            {{ title }}
          </h3>
          <div class="mt-1.5">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .dialog-enter-active,
  .dialog-leave-active {
    transition: opacity 0.18s ease;
  }

  .dialog-enter-active > div,
  .dialog-leave-active > div {
    transition: transform 0.18s ease;
  }

  .dialog-enter-from,
  .dialog-leave-to {
    opacity: 0;
  }

  .dialog-enter-from > div,
  .dialog-leave-to > div {
    transform: scale(0.94);
  }
</style>
