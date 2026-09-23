<script setup lang="ts">
  import { allNews, categories } from '~/data/news'
  import { normalizeQueryParam } from '~/utils/params'

  const router = useRouter()
  const route = useRoute()

  usePageTitle('首页')

  function normalizeCategory(val: unknown) {
    const ids = categories.map((category) => category.id)
    return normalizeQueryParam(val, ids, 'all')
  }

  const activeCategory = ref(normalizeCategory(route.query.cat))

  watch(
    () => route.query.cat,
    (val) => {
      const next = normalizeCategory(val)
      if (next !== activeCategory.value) activeCategory.value = next
    },
  )

  watch(activeCategory, (val) => {
    const query = { ...route.query }
    if (val === 'all') delete query.cat
    else query.cat = val
    const nextQuery = query.cat === undefined ? undefined : String(query.cat)
    if (nextQuery !== route.query.cat) router.replace({ query })
  })

  const list = computed(() =>
    activeCategory.value === 'all' ? allNews : allNews.filter((item) => item.category === activeCategory.value),
  )

  const dividerText = computed(() => {
    if (activeCategory.value === 'all') return '最新资讯'
    const label = categories.find((c) => c.id === activeCategory.value)?.label ?? ''
    return `${label} · 共 ${list.value.length} 条`
  })
</script>

<template>
  <div>
    <CategoryTabs v-model="activeCategory" />
    <div class="p-4 pt-3">
      <NewsList :dividerText="dividerText" emptyText="暂无相关资讯" featured :items="list" />
    </div>
  </div>
</template>
