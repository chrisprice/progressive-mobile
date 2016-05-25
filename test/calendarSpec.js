import { firstDayOfWeek, days } from '../lib/calendar/calendar';

export const testFirstDayOfWeek = (expect) => {
  expect(firstDayOfWeek(new Date(1461665762122)).getTime()).to.equal(1461579362122);
};

export const testDays = (expect) => {
  expect(days(new Date(1461665762122))).to.equal(
    [
        { day: 25, activeMonth: true, activeDate: false, future: false },
        { day: 26, activeMonth: true, activeDate: false, future: false },
        { day: 27, activeMonth: true, activeDate: true, future: false },
        { day: 28, activeMonth: true, activeDate: false, future: true },
        { day: 29, activeMonth: true, activeDate: false, future: true },
        { day: 30, activeMonth: true, activeDate: false, future: true },
        { day: 1, activeMonth: false, activeDate: false, future: true },
        { day: 2, activeMonth: false, activeDate: false, future: true },
        { day: 3, activeMonth: false, activeDate: false, future: true },
        { day: 4, activeMonth: false, activeDate: false, future: true },
        { day: 5, activeMonth: false, activeDate: false, future: true },
        { day: 6, activeMonth: false, activeDate: false, future: true },
        { day: 7, activeMonth: false, activeDate: false, future: true },
        { day: 8, activeMonth: false, activeDate: false, future: true }
    ]
  )
};
