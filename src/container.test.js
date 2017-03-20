import React from 'react'
import {shallow} from 'enzyme'

jest.mock('./stocks')
import {getLastStockValues, updateStocksSeries} from './stocks'
import AppContainer from './container'

describe('<AppContainer />', () => {
  afterEach(() => {
    updateStocksSeries.mockClear()
  })

  it('should set the result of getLastStockValues in state', () => {
    const appContainer = shallow(<AppContainer />).instance()
    return appContainer.componentDidMount()
    expect(updateStocksSeries).toHaveBeenCalled()
  })
})
