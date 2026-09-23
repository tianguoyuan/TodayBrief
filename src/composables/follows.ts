export const followedUsers = useLocalStorage<string[]>('vue-news:follows', [])

export function toggleFollowUser(name: string) {
  followedUsers.value = followedUsers.value.includes(name)
    ? followedUsers.value.filter((user) => user !== name)
    : [...followedUsers.value, name]
}
