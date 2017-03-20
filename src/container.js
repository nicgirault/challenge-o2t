import React from 'react'
import find from 'lodash/find'

import O2tStocksSeriesTable from './components/o2t-stocks-series-table'
import O2tStocksSeriesGraph from './components/o2t-stocks-series-graph'
import {getLastStockValues, getSeriesIds} from './stocks'

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stocksSeries: []
    }
  }
  componentDidMount () {
    return this.updateStocksSeries()
  }
  updateStocksSeries () {
    return getLastStockValues()
    .then((stocksSeries) => {
      this.setState({
        stocksSeries: stocksSeries.map((newItem) => {
          const defaultItem = find(
            this.state.stocksSeries,
            (item) => item.index === newItem.index
          )
          if (defaultItem) {
            return defaultItem
          }
          return newItem
        })
      })
      return new Promise((resolve) => setTimeout(resolve, 1000))
    })
    .then(this.updateStocksSeries.bind(this))
  }
  onValueUpdate (value, identifier) {
    this.setState({
      stocksSeries: this.state.stocksSeries.map((item) => {
        if (identifier.index === item.index) {
          item.stocks[identifier.seriesId] = value
        }
        return item
      })
    })
  }
  render () {
    if (this.state.stocksSeries.length === 0) {
      return null
    }
    return (
      <div>
        <O2tStocksSeriesGraph
          seriesIds={getSeriesIds(this.state.stocksSeries)}
          stocksSeries={this.state.stocksSeries}
        />
        <O2tStocksSeriesTable
          seriesIds={getSeriesIds(this.state.stocksSeries)}
          stocksSeries={this.state.stocksSeries}
          onValueUpdate={this.onValueUpdate.bind(this)}
        />
      </div>
    )
  }
}
