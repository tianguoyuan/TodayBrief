export type FontScale = 'sm' | 'md' | 'lg'

const fontScaleMap: Record<FontScale, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
}

export const fontSize = useLocalStorage<FontScale>('vue-news:font-size', 'md')

export const notificationsEnabled = useLocalStorage('vue-news:notifications', true)

export function applyFontScale() {
  document.documentElement.style.fontSize = fontScaleMap[fontSize.value]
}

watchEffect(() => {
  applyFontScale()
})
