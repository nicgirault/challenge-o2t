import React from 'react'

import {init} from '../graph'

let updater = null

export default class O2tStocksSeriesGraph extends React.Component {
  componentDidMount () {
    updater = init(
      this.props.seriesIds,
      this.props.stocksSeries,
      {
        width: window.innerWidth,
        height: 500,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 20
      }
    )
  }
  componentWillReceiveProps (nextProps) {
    updater(nextProps.stocksSeries)
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
