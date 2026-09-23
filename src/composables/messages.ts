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
    id: 'm1',
    type: 'follow',
    title: '清风徐来 关注了你',
    desc: '你们的观点很相似，快去看看吧。',
    time: '2分钟前',
    username: '清风徐来',
  },
  {
    id: 'm2',
    type: 'like',
    title: '数码玩家 赞了你的评论',
    desc: '推理成本下降约三成，这才是大模型落地最实在的变量。',
    time: '18分钟前',
    newsId: 'n03',
  },
  {
    id: 'm3',
    type: 'reply',
    title: '环球观察者 回复了你',
    desc: '同意，期待后续更新。',
    time: '1小时前',
    newsId: 'n02',
  },
  {
    id: 'm4',
    type: 'system',
    title: '新版本 v1.1.0 已上线',
    desc: '新增阅读历史、消息中心与个人主页，还支持切换字体大小。',
    time: '昨天',
  },
  {
    id: 'm5',
    type: 'like',
    title: '街头摄影师 等 3 人赞了你的评论',
    desc: '城市更新的温度，恰恰体现在这些细节里。',
    time: '昨天 21:07',
    newsId: 'n07',
  },
  {
    id: 'm6',
    type: 'follow',
    title: '咖啡不加糖 关注了你',
    desc: 'TA 收藏了 26 篇科技资讯，兴趣相投的人又多了。',
    time: '前天',
    username: '咖啡不加糖',
  },
  {
    id: 'm7',
    type: 'reply',
    title: '山间明月 回复了你',
    desc: '可以看看隔壁那篇，讲得更细。',
    time: '前天 16:40',
    newsId: 'n16',
  },
  {
    id: 'm8',
    type: 'system',
    title: '隐私小贴士',
    desc: '你的偏好数据仅保存在本机，不会上传服务器。可在设置中一键清除。',
    time: '上周',
  },
])

const readStore = createIdSet('vue-news:read-messages')

export const readMessageIds = readStore.ids
export const isMessageRead = readStore.has

export const unreadCount = computed(() =>
  appMessages.value.filter(message => !isMessageRead(message.id)).length,
)

export function markRead(id: string) {
  readStore.add(id)
}

export function markAllRead() {
  readStore.replace(appMessages.value.map(message => message.id))
}

export function clearMessages() {
  appMessages.value = []
  readStore.clear()
}
