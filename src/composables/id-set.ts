export function createIdSet(key: string, options: { prepend?: boolean } = {}) {
  const ids = useLocalStorage<string[]>(key, [])
  const set = computed(() => new Set(ids.value))

  function has(id: string) {
    return set.value.has(id)
  }

  function add(id: string) {
    if (options.prepend) {
      ids.value = [id, ...ids.value.filter(item => item !== id)]
      return
    }
    if (!set.value.has(id))
      ids.value = [...ids.value, id]
  }

  function remove(id: string) {
    if (!set.value.has(id))
      return
    ids.value = ids.value.filter(item => item !== id)
  }

  function clear() {
    ids.value = []
  }

  function replace(newIds: string[]) {
    ids.value = [...newIds]
  }

  return { ids, has, add, remove, clear, replace }
}
