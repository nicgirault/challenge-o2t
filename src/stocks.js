import {get} from 'axios'
import find from 'lodash/find'

import config from '../config'

export const getLastStockValues = (count = 20) => {
  return get(config.STOCK_API_BASE_URL, {params: {count}})
  .then((response) => {
    if (response.status < 300) {
      return response.data
    }
    throw new Error(response.statusText)
  })
}

export const getSeriesIds = (stocksSeries) => {
  if (stocksSeries.length === 0) {
    return []
  }
  return Object.keys(stocksSeries[0].stocks)
}

export const updateStocksSeries = (oldStocksSeries, notifier) => {
  getLastStockValues()
  .then((newStocksSeries) => {
    const mergedStocksSeries = newStocksSeries.map((newItem) => {
      const item = find(
        oldStocksSeries,
        (oldItem) => oldItem.index === newItem.index
      )
      return item || newItem
    })
    notifier(mergedStocksSeries)
    return new Promise((resolve) => setTimeout(() => resolve(mergedStocksSeries), 1000))
  })
  .then((mergedStocksSeries) => {
    return updateStocksSeries(mergedStocksSeries, notifier)
  })
}
