export type FontScale = 'sm' | 'md' | 'lg'

const fontScaleMap: Record<FontScale, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
}

export const fontSize = useLocalStorage<FontScale>('vue-news:font-size', 'md')

export const notificationsEnabled = useLocalStorage('vue-news:notifications', true)

watchEffect(() => {
  document.documentElement.style.fontSize = fontScaleMap[fontSize.value]
})
