const key = 'vue-news:favorites'

export const favoriteIds = useLocalStorage<string[]>(key, [])

export function toggleFavorite(id: string) {
  favoriteIds.value = favoriteIds.value.includes(id)
    ? favoriteIds.value.filter((i) => i !== id)
    : [...favoriteIds.value, id]
}

export function clearFavorites() {
  favoriteIds.value = []
}
