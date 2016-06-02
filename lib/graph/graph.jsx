import d3 from 'd3'
import './graph.css!'
import classNames from 'classnames'

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
