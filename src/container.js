import React from 'react'

import O2tStocksSeriesTable from './components/o2t-stocks-series-table'
import O2tStocksSeriesGraph from './components/o2t-stocks-series-graph'
import {getLastStockValues} from './stocks'

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stocksSeries: []
    }
  }
  componentDidMount () {
    return getLastStockValues()
    .then((stocksSeries) => this.setState({stocksSeries}))
  }
  getSeriesIds (stocksSeries) {
    if (stocksSeries.length === 0) {
      return []
    }
    return Object.keys(stocksSeries[0].stocks)
  }
  render () {
    return (
      <div>
        <O2tStocksSeriesGraph
          seriesIds={this.getSeriesIds(this.state.stocksSeries)}
          stocksSeries={this.state.stocksSeries}
        />
        <O2tStocksSeriesTable
          seriesIds={this.getSeriesIds(this.state.stocksSeries)}
          stocksSeries={this.state.stocksSeries}
        />
      </div>
    )
  }
}
