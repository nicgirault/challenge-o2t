import {get} from 'axios'

export const getLastStockValues = (count = 20) => {
  return get('http://localhost:8000', {params: {count}})
  .then((response) => {
    if (response.status < 300) {
      return response.data
    }
    throw new Error(response.statusText)
  })
}
