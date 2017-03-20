import React from 'react'
import {shallow} from 'enzyme'
import O2tStocksSeriesTable from './o2t-stocks-series-table'
import stocksSeries from '../../test/data/stock-series'

test('O2tStocksSeriesTable display the stocks series', () => {
  const seriesIds = ['NASDAQ', 'CAC40']
  const stocksTable = shallow(
    <O2tStocksSeriesTable
      seriesIds={seriesIds}
      stocksSeries={stocksSeries}
    />
  )

  expect(stocksTable.find('tr').length).toEqual(2)
  stocksTable.find('tr').forEach((tr, index) => {
    expect(tr.find('td').length).toEqual(3)
    tr.find('td').forEach((td, tdIndex) => {
      expect(td.text()).toEqual(stocksSeries[tdIndex].stocks[seriesIds[index]].toFixed(2))
    })
    expect(tr.find('th').length).toEqual(1)
    expect(tr.find('th').text()).toEqual(seriesIds[index])
  })
})
