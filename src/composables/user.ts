export interface UserProfile {
  loggedIn: boolean
  nickname: string
  bio: string
}

export const user = useLocalStorage<UserProfile>('vue-news:user', {
  bio: '关注科技 · 热爱生活',
  loggedIn: false,
  nickname: '今日快讯用户',
})
