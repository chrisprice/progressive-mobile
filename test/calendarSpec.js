import { firstDayOfWeek, weeksOfDays } from '../lib/calendar/calendar';

export const testFirstDayOfWeek = (expect) => {
  expect(firstDayOfWeek(new Date(1461665762122)).getTime()).to.equal(1461579362122);
};

export const testWeeksOfDays = (expect) => {
  expect(weeksOfDays(new Date(1461665762122))).to.deep.equal(
    [
        { date: 25, activeMonth: true, activeDate: false, future: false },
        { date: 26, activeMonth: true, activeDate: true, future: false },
        { date: 27, activeMonth: true, activeDate: false, future: true },
        { date: 28, activeMonth: true, activeDate: false, future: true },
        { date: 29, activeMonth: true, activeDate: false, future: true },
        { date: 30, activeMonth: true, activeDate: false, future: true },
        { date: 1, activeMonth: false, activeDate: false, future: true },
        { date: 2, activeMonth: false, activeDate: false, future: true },
        { date: 3, activeMonth: false, activeDate: false, future: true },
        { date: 4, activeMonth: false, activeDate: false, future: true },
        { date: 5, activeMonth: false, activeDate: false, future: true },
        { date: 6, activeMonth: false, activeDate: false, future: true },
        { date: 7, activeMonth: false, activeDate: false, future: true },
        { date: 8, activeMonth: false, activeDate: false, future: true }
    ]
  )
};
