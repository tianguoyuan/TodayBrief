<script setup lang="ts">
  import { allNews, categories } from '~/data/news'

  const route = useRoute()
  const routeParams = route.params as Record<string, string>

  const activeId = ref(routeParams.id)

  watch(
    () => routeParams.id,
    (id) => {
      activeId.value = id
    },
  )

  const category = computed(() => categories.find((c) => c.id === activeId.value) ?? categories[1])

  usePageTitle(() => category.value.label)

  const list = computed(() => allNews.filter((item) => item.category === activeId.value))
</script>

<template>
  <div>
    <CategoryTabs v-model="activeId" />
    <div class="p-4 pt-3">
      <NewsList
        :dividerText="`${category.label}栏目 · 共 ${list.length} 条`"
        emptyText="暂无相关资讯"
        featured
        :items="list"
      />
    </div>
  </div>
</template>
