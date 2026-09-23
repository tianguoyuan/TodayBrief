export const pageTitle = ref('首页')

export function usePageTitle(title: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    const t = toValue(title)
    pageTitle.value = t
    document.title = `今日快讯-${t}`
  })
}
