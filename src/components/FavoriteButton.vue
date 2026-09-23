<script setup lang="ts">
  import { favoriteIds, toggleFavorite } from '~/composables/favorites'

  const { id } = defineProps<{ id: string }>()

  const isFav = computed(() => favoriteIds.value.includes(id))
</script>

<template>
  <button
    :aria-label="isFav ? '取消收藏' : '收藏'"
    class="icon-btn text-lg"
    :class="isFav ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'"
    :title="isFav ? '取消收藏' : '收藏'"
    type="button"
    @click="toggleFavorite(id)"
  >
    <div :class="isFav ? 'i-carbon-favorite-filled' : 'i-carbon-favorite'" />
  </button>
</template>
