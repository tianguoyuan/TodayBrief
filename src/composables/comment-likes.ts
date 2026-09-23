const store = createIdSet('vue-news:liked-comments')

export const likedCommentIds = store.ids
export const isLiked = store.has

export function toggleLiked(id: string) {
  if (store.has(id))
    store.remove(id)
  else
    store.add(id)
}
