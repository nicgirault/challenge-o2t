import {get} from 'axios'

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
