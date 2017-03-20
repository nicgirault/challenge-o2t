import React from 'react'
import O2tStocksValue from './o2t-stocks-value'

export default class O2tStocksSeriesTable extends React.Component {
  renderStocksSeries (seriesId) {
    return (
      <tr key={seriesId}>
        <th>{seriesId}</th>
        {
          this.props.stocksSeries.map((item) => {
            return (
              <td key={item.index}>
                <O2tStocksValue
                  value={item.stocks[seriesId]}
                  identifier={{seriesId: seriesId, index: item.index}}
                  onUpdate={this.props.onValueUpdate}
                />
              </td>
            )
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
  stocksSeries: React.PropTypes.array.isRequired,
  onValueUpdate: React.PropTypes.func.isRequired
}
