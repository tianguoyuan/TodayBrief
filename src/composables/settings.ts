export type FontScale = 'sm' | 'md' | 'lg'

const fontScaleMap: Record<FontScale, string> = {
  lg: '18px',
  md: '16px',
  sm: '14px',
}

export const fontSize = useLocalStorage<FontScale>('vue-news:font-size', 'md')

export const notificationsEnabled = useLocalStorage('vue-news:notifications', true)

export function applyFontScale() {
  document.documentElement.style.fontSize = fontScaleMap[fontSize.value]
}

watchEffect(() => {
  applyFontScale()
})
