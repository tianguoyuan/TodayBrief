<script setup lang="ts">
import { allNews, categories } from '~/data/news'

const router = useRouter()
const route = useRoute()

usePageTitle('首页')

const activeCategory = ref((route.query.cat as string) || 'all')

watch(() => route.query.cat, (val) => {
  const next = (val as string) || 'all'
  if (next !== activeCategory.value)
    activeCategory.value = next
})

watch(activeCategory, (val) => {
  const query = { ...route.query }
  if (val === 'all')
    delete query.cat
  else
    query.cat = val
  const nextQuery = query.cat === undefined ? undefined : String(query.cat)
  if (nextQuery !== route.query.cat)
    router.replace({ query })
})

const list = computed(() =>
  activeCategory.value === 'all'
    ? allNews
    : allNews.filter(item => item.category === activeCategory.value),
)

const dividerText = computed(() => {
  if (activeCategory.value === 'all')
    return '最新资讯'
  const label = categories.find(c => c.id === activeCategory.value)?.label ?? ''
  return `${label} · 共 ${list.value.length} 条`
})
</script>

<template>
  <div>
    <CategoryTabs v-model="activeCategory" />
    <div class="p-4 pt-3">
      <NewsList
        :items="list"
        featured
        :divider-text="dividerText"
        empty-text="暂无相关资讯"
      />
    </div>
  </div>
</template>
