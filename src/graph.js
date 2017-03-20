import {scaleTime, scaleLinear, schemeCategory10} from 'd3-scale'
import {select} from 'd3-selection'
import {max} from 'd3-array'
import {line} from 'd3-shape'
import {axisLeft, axisBottom} from 'd3-axis'
import {timeSecond} from 'd3-time'
import 'd3-transition'

const yDomain = (seriesIds, stocksSeries) => {
  return [
    0,
    max(stocksSeries, (item) => {
      return seriesIds.reduce((accumulator, seriesId) => {
        if (accumulator < item.stocks[seriesId]) {
          accumulator = item.stocks[seriesId]
        }
        return accumulator
      }, -Infinity)
    })
  ]
}

export const init = (seriesIds, stocksSeries, options) => {
  if (stocksSeries.length === 0) {
    return null
  }

  const width = options.width - options.marginLeft - options.marginRight
  const height = options.height - options.marginTop - options.marginBottom

  const x = scaleTime()
    .domain([
      stocksSeries[0].timestamp,
      stocksSeries[stocksSeries.length - 1].timestamp
    ])
    .range([0, width])

  const y = scaleLinear()
    .domain(yDomain(seriesIds, stocksSeries))
    .range([height, 0])

  const yAxis = axisLeft(y)
  const xAxis = axisBottom(x).ticks(timeSecond)

  const lines = seriesIds.map((seriesId) => {
    return [seriesId, line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.stocks[seriesId]))
    ]
  })

  const graph = select('svg')
    .attr('width', options.width)
    .attr('height', options.height)
  .append('g')
    .attr('transform', `translate(${options.marginLeft}, ${options.marginTop})`)

  graph.append('g')
    .attr('class', 'yAxis')
    .call(yAxis)
  graph.append('g')
    .attr('transform', `translate(0, ${height})`)
    .attr('class', 'xAxis')
    .call(xAxis)

  lines.forEach(([seriesId, line], index) => {
    graph.append('path')
      .attr('class', `line-${seriesId}`)
      .datum(stocksSeries)
      .attr('fill', 'none')
      .attr('stroke', schemeCategory10[index % 10])
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  })

  const updater = (newStockSeries) => {
    y.domain(yDomain(seriesIds, newStockSeries))

    const transition = graph.transition()
    transition.select('.yAxis').duration(250).call(yAxis)

    lines.forEach(([seriesId, line], index) => {
      transition.select(`.line-${seriesId}`)
        .duration(250)
        .attr('d', line)
    })
  }

  return updater
}
