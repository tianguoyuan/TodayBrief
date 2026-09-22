const key = 'vue-news:history'

export const historyIds = useLocalStorage<string[]>(key, [])

export function addHistory(id: string) {
  historyIds.value = [id, ...historyIds.value.filter(item => item !== id)]
}

export function removeHistory(id: string) {
  historyIds.value = historyIds.value.filter(item => item !== id)
}

export function clearHistory() {
  historyIds.value = []
}
