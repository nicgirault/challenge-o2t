import React from 'react'

export default class O2tStocksSeriesTable extends React.Component {
  renderStocksSeries (seriesId) {
    return (
      <tr key={seriesId}>
        <th>{seriesId}</th>
        {
          this.props.stocksSeries.map((item) => {
            return <td key={item.timestamp}>{item.stocks[seriesId].toFixed(2)}</td>
          })
        }
      </tr>
    )
  }

  render () {
    return (
      <table>
        <tbody>
          {
            this.props.seriesIds.map((seriesId) => {
              return this.renderStocksSeries(seriesId)
            })
          }
        </tbody>
      </table>
    )
  }
}

O2tStocksSeriesTable.propTypes = {
  seriesIds: React.PropTypes.array.isRequired,
  stocksSeries: React.PropTypes.array.isRequired
}
