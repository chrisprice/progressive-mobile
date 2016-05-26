import React from 'react'
import classNames from 'classnames'
import './calendar.css!'

const FIRST_DAY_OF_WEEK = 1
const DAYS_IN_A_WEEK = 7
const NUMBER_OF_WEEKS = 2

const offsetDate = (date, count) => {
  const result = new Date(date)
  result.setDate(date.getDate() + count)
  return result
}

export const firstDayOfWeek = (date) => {
  while (date.getDay() !== FIRST_DAY_OF_WEEK) {
    date = offsetDate(date, -1)
  }
  return date
}

export const weeksOfDays = (activeDate) => {
  const dates = []
  const firstDate = firstDayOfWeek(activeDate)
  if (firstDate.getDate() !== activeDate.getDate()) {
    dates.push(firstDate)
  } else {
    dates.push(offsetDate(firstDate, -DAYS_IN_A_WEEK))
  }
  while (dates.length < NUMBER_OF_WEEKS * DAYS_IN_A_WEEK) {
    let previous = dates[dates.length - 1]
    const date = new Date(previous)
    date.setDate(previous.getDate() + 1)
    dates.push(date)
  }
  return dates.map(
    date => ({
      date: date.getDate(),
      activeMonth: date.getMonth() === activeDate.getMonth(),
      activeDate: date.getDate() === activeDate.getDate(),
      future: date > activeDate
    })
  )
}

export const classes = (day) => classNames({
  'active-month': day.activeMonth,
  'active-date': day.activeDate,
  'historic': !day.future
})

export const day = (day) =>
  <td key={day.date} className={classes(day)}>{day.date}</td>

export default (props) => {
  const days = weeksOfDays(props.date)
  return (
    <section className="calendar">
      <table>
        <tbody>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
          </tr>
          {
            Array.from({ length: NUMBER_OF_WEEKS }, (_, i) =>
              <tr key={i}>
              {
                days.slice(i * DAYS_IN_A_WEEK, (i + 1) * DAYS_IN_A_WEEK)
                  .map(day)
              }
              </tr>
            )
          }
        </tbody>
      </table>
    </section>
  )
}
