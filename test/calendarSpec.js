import run from './run'
import { firstDayOfWeek, weeksOfDays } from '../lib/calendar/calendar'

run({
  testFirstDayOfWeek: (expect) => {
    expect(firstDayOfWeek(new Date(1461665762122)).getTime()).to.equal(1461579362122)
  },
  testWeeksOfDays: (expect) => {
    expect(weeksOfDays(new Date(1461665762122))).to.deep.equal(
      [
          { date: '2016-04-24T23:00:00.000Z', display: 25, activeMonth: true, activeDate: false, future: false },
          { date: '2016-04-25T23:00:00.000Z', display: 26, activeMonth: true, activeDate: true, future: false },
          { date: '2016-04-26T23:00:00.000Z', display: 27, activeMonth: true, activeDate: false, future: true },
          { date: '2016-04-27T23:00:00.000Z', display: 28, activeMonth: true, activeDate: false, future: true },
          { date: '2016-04-28T23:00:00.000Z', display: 29, activeMonth: true, activeDate: false, future: true },
          { date: '2016-04-29T23:00:00.000Z', display: 30, activeMonth: true, activeDate: false, future: true },
          { date: '2016-04-30T23:00:00.000Z', display: 1, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-01T23:00:00.000Z', display: 2, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-02T23:00:00.000Z', display: 3, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-03T23:00:00.000Z', display: 4, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-04T23:00:00.000Z', display: 5, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-05T23:00:00.000Z', display: 6, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-06T23:00:00.000Z', display: 7, activeMonth: false, activeDate: false, future: true },
          { date: '2016-05-07T23:00:00.000Z', display: 8, activeMonth: false, activeDate: false, future: true }
      ]
    )
  }
})
