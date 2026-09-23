export interface AppMessage {
  id: string
  type: 'like' | 'reply' | 'follow' | 'system'
  title: string
  desc: string
  time: string
  newsId?: string
  username?: string
}

export const appMessages = useLocalStorage<AppMessage[]>('vue-news:messages', [
  {
    desc: '你们的观点很相似，快去看看吧。',
    id: 'm1',
    time: '2分钟前',
    title: '清风徐来 关注了你',
    type: 'follow',
    username: '清风徐来',
  },
  {
    desc: '推理成本下降约三成，这才是大模型落地最实在的变量。',
    id: 'm2',
    newsId: 'n03',
    time: '18分钟前',
    title: '数码玩家 赞了你的评论',
    type: 'like',
  },
  {
    desc: '同意，期待后续更新。',
    id: 'm3',
    newsId: 'n02',
    time: '1小时前',
    title: '环球观察者 回复了你',
    type: 'reply',
  },
  {
    desc: '新增阅读历史、消息中心与个人主页，还支持切换字体大小。',
    id: 'm4',
    time: '昨天',
    title: '新版本 v1.1.0 已上线',
    type: 'system',
  },
  {
    desc: '城市更新的温度，恰恰体现在这些细节里。',
    id: 'm5',
    newsId: 'n07',
    time: '昨天 21:07',
    title: '街头摄影师 等 3 人赞了你的评论',
    type: 'like',
  },
  {
    desc: 'TA 收藏了 26 篇科技资讯，兴趣相投的人又多了。',
    id: 'm6',
    time: '前天',
    title: '咖啡不加糖 关注了你',
    type: 'follow',
    username: '咖啡不加糖',
  },
  {
    desc: '可以看看隔壁那篇，讲得更细。',
    id: 'm7',
    newsId: 'n16',
    time: '前天 16:40',
    title: '山间明月 回复了你',
    type: 'reply',
  },
  {
    desc: '你的偏好数据仅保存在本机，不会上传服务器。可在设置中一键清除。',
    id: 'm8',
    time: '上周',
    title: '隐私小贴士',
    type: 'system',
  },
])

const readStore = createIdSet('vue-news:read-messages')

export const readMessageIds = readStore.ids
export const isMessageRead = readStore.has

export const unreadCount = computed(() => appMessages.value.filter((message) => !isMessageRead(message.id)).length)

export function markRead(id: string) {
  readStore.add(id)
}

export function markAllRead() {
  readStore.replace(appMessages.value.map((message) => message.id))
}

export function clearMessages() {
  appMessages.value = []
  readStore.clear()
}
