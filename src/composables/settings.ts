export type FontScale = 'sm' | 'md' | 'lg'
export type BackMode = 'single' | 'capsule'

const fontScaleMap: Record<FontScale, string> = {
  lg: '18px',
  md: '16px',
  sm: '14px',
}

export const fontSize = useLocalStorage<FontScale>('vue-news:font-size', 'md')

export const notificationsEnabled = useLocalStorage('vue-news:notifications', true)

export const backMode = useLocalStorage<BackMode>('vue-news:back-mode', 'capsule')

export function applyFontScale() {
  document.documentElement.style.fontSize = fontScaleMap[fontSize.value]
}

watchEffect(() => {
  applyFontScale()
})
