import d3 from 'd3'
import './graph.css!'
import classNames from 'classnames'
import ease from './ease'

export const ROW_HEIGHT = 50
export const BUBBLE_SIZE = 25
export const BUBBLE_INNER_RADIUS = 4
export const BUBBLE_OUTER_RADIUS = 6

export const bubble = (selection) => {
  selection.each(function ({ first, last, hidden, active, firstDayOfWeek }) {

    const line = d3.select(this)
      .selectAll('line')
      .data([ null ])

    line.enter()
      .append('line')
      .attr('class', 'bubble')
      .attr('x1', BUBBLE_SIZE/2)
      .attr('x2', BUBBLE_SIZE/2)

    line.attr('y1', first ? BUBBLE_SIZE/2 : 0)
      .attr('y2', last ? BUBBLE_SIZE/2 : BUBBLE_SIZE)

    const ellipse = d3.select(this)
      .selectAll('ellipse')
      .data([ null ])

    ellipse.enter()
      .append('ellipse')
      .attr('class', 'bubble')
      .attr('cx', BUBBLE_SIZE/2)
      .attr('cy', BUBBLE_SIZE/2)

    ellipse.attr('rx', active ? BUBBLE_OUTER_RADIUS : 0)
    .attr('ry', active ? BUBBLE_OUTER_RADIUS : 0)

    const circle = d3.select(this)
      .selectAll('circle')
      .data([ null ])

    circle.enter()
      .append('circle')
      .attr('class', classNames({
        bubble: true,
        hollow: firstDayOfWeek
      }))
      .attr('cx', BUBBLE_SIZE/2)
      .attr('cy', BUBBLE_SIZE/2)

    circle.attr('r', hidden ? 0 : BUBBLE_INNER_RADIUS)
  })
}

export const graph = (selection) => {
  selection
    .each(function ({ rows, height, width, offset }) {
      const data = rows.map((row, i) =>
          ({
            offset: offset + ROW_HEIGHT * i + ROW_HEIGHT/2,
            account_balance: row.account_balance
          })
        )
        .filter(d => d.account_balance != null)
        .slice(0, 12)

      const xScale = d3.scale.linear()
        .domain([ data.length - 1, 0 ])
        .range([ 0, width ])

      const yExtent = d3.extent(data, (d) => d.account_balance)

      const yScale = d3.scale.linear()
        .domain(yExtent)
        .range([ height * 0.7, height * 0.2 ])

      const path = d3.select(this)
        .selectAll('path')
        .data([ data ])

      const intialLine = d3.svg.line()
      .x(() => ROW_HEIGHT/2)
      .y((d) => d.offset)

      path.enter()
        .append('path')
        .attr('d', intialLine)

      const line = d3.svg.line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.account_balance))


      const x = d3.ease('poly-out', 1.5)
      const y = d3.ease('poly-in', 1.5)

      path.transition()
        .ease('linear')
        .duration(900)
        .attrTween('d', (d) => (t) => {
          line.x((d, i) =>
            d3.interpolateNumber(
              ROW_HEIGHT/2, xScale(i)
            )(
              x(ease({ index: i, count: data.length, initialDuration: 0.5 })(t))
            )
          )
          line.y((d, i) =>
            d3.interpolateNumber(
              d.offset, yScale(d.account_balance)
            )(
              y(ease({ index: i, count: data.length, initialDuration: 0.5 })(t))
            )
          )
          return line(d)
        })
    })
}
