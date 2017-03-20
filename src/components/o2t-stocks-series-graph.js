import React from 'react'

import {init} from '../graph'

export default class O2tStocksSeriesGraph extends React.Component {
  componentWillReceiveProps (nextProps) {
    init(
      nextProps.seriesIds,
      nextProps.stocksSeries,
      {width: window.innerWidth, height: 500}
    )
  }

  render () {
    return (
      <div>
        <svg></svg>
      </div>
    )
  }
}

O2tStocksSeriesGraph.propTypes = {
  seriesIds: React.PropTypes.array.isRequired,
  stocksSeries: React.PropTypes.array.isRequired
}
