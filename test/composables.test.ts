import { describe, expect, it } from 'vitest'
import { clearFavorites, favoriteIds, toggleFavorite } from '../src/composables/favorites'
import { addHistory, clearHistory, historyIds, removeHistory } from '../src/composables/history'

describe('history composable', () => {
  it('adds and de-duplicates to the front', () => {
    clearHistory()
    addHistory('n01')
    addHistory('n02')
    expect(historyIds.value).toEqual(['n02', 'n01'])
    addHistory('n01')
    expect(historyIds.value).toEqual(['n01', 'n02'])
  })

  it('removes a single item', () => {
    clearHistory()
    addHistory('n01')
    addHistory('n02')
    removeHistory('n01')
    expect(historyIds.value).toEqual(['n02'])
  })

  it('clears all items', () => {
    clearHistory()
    addHistory('n01')
    expect(historyIds.value).toHaveLength(1)
    clearHistory()
    expect(historyIds.value).toEqual([])
  })
})

describe('favorites composable', () => {
  it('toggles favorites on and off', () => {
    clearFavorites()
    toggleFavorite('n01')
    expect(favoriteIds.value).toEqual(['n01'])
    toggleFavorite('n01')
    expect(favoriteIds.value).toEqual([])
  })

  it('keeps multiple favorites', () => {
    clearFavorites()
    toggleFavorite('n01')
    toggleFavorite('n02')
    expect(favoriteIds.value).toEqual(['n01', 'n02'])
  })

  it('clears all favorites', () => {
    clearFavorites()
    toggleFavorite('n01')
    clearFavorites()
    expect(favoriteIds.value).toEqual([])
  })
})
