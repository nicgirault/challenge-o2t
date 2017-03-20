import React from 'react'
import {shallow} from 'enzyme'

jest.mock('./stocks')
import {getLastStockValues} from './stocks'
import stocksSeriesData from '../test/data/stock-series'
import AppContainer from './container'

describe('<AppContainer />', () => {
  beforeEach(() => {
    getLastStockValues
    .mockReturnValueOnce(new Promise((resolve) => resolve(stocksSeriesData)))
  })

  afterEach(() => {
    getLastStockValues.mockClear()
  })

  it('should set the result of getLastStockValues in state', () => {
    const appContainer = shallow(<AppContainer />).instance()
    return appContainer.componentDidMount().then(() => {
      expect(appContainer.state.stocksSeries).toEqual(stocksSeriesData)
    })
  })
})
