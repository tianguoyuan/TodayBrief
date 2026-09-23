const key = 'vue-news:history'

const store = createIdSet(key, { prepend: true })

export const historyIds = store.ids
export const addHistory = store.add
export const removeHistory = store.remove
export const clearHistory = store.clear
