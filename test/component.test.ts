import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StatItem from '../src/components/StatItem.vue'

describe('component of StatItem.vue', () => {
  it('should render value and label', () => {
    const wrapper = mount(StatItem, { props: { label: '收藏', value: 42 } })
    expect(wrapper.text()).toContain('42')
    expect(wrapper.text()).toContain('收藏')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should highlight when enabled', async () => {
    const wrapper = mount(StatItem, { props: { highlight: true, label: '阅读', value: '12.6万' } })
    expect(wrapper.text()).toContain('12.6万')
    expect(wrapper.find('p').classes()).toContain('text-orange-500')
  })
})
