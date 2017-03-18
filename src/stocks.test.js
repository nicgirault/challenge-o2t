import axios from 'axios'
import {getLastStockValues} from './stocks'
import config from '../config'

beforeEach(() => {
  axios.get = jest.fn()
})

afterEach(() => {
  axios.get.mockClear()
})

it('should return the response data when response is OK', () => {
  axios.get.mockReturnValueOnce(new Promise((resolve) => {
    return resolve({status: 200, data: []})
  }))
  return getLastStockValues()
  .then(stocks => {
    expect(stocks).toBeInstanceOf(Array)
  })
})

it('should throw an error when status code is an error code', () => {
  axios.get.mockReturnValueOnce(new Promise((resolve, reject) => {
    const error = new Error('Service unavailable')
    error.status = 501
    return reject(error)
  }))

  return getLastStockValues()
  .then(stocks => {
    throw new Error('This test should not pass on this line')
  })
  .catch(error => {
    expect(error).toBeInstanceOf(Error)
    expect(error.message).not.toEqual('This test should not pass on this line')
    expect(error.status).toEqual(501)
  })
})

it('should request the stocks with count equal to first arg', () => {
  axios.get.mockReturnValueOnce(new Promise((resolve, reject) => {
    return resolve({status: 200, data: []})
  }))
  return getLastStockValues(8)
  .then(() => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get.mock.calls[0][1].params.count).toEqual(8)
  })
})

it('should request the stocks with a default count of 20', () => {
  axios.get.mockReturnValueOnce(new Promise((resolve, reject) => {
    return resolve({status: 200, data: []})
  }))
  return getLastStockValues()
  .then(() => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get.mock.calls[0][1].params.count).toEqual(20)
  })
})

it('should request the stocks with configured url', () => {
  axios.get.mockReturnValueOnce(new Promise((resolve, reject) => {
    return resolve({status: 200, data: []})
  }))
  return getLastStockValues()
  .then(() => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get.mock.calls[0][0]).toEqual(config.STOCK_API_BASE_URL)
    expect(config.STOCK_API_BASE_URL.length).toBeGreaterThan(0)
  })
})
