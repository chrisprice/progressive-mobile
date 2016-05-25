const FIRST_DAY_OF_WEEK = 1;
const DAYS_IN_A_WEEK = 7;
const NUMBER_OF_WEEKS = 2;

export const firstDayOfWeek = (date) => {
  while (date.getDay() !== FIRST_DAY_OF_WEEK) {
    date = new Date(date.setDate(date.getDate() - 1));
  }
  return date;
};

export const testFirstDayOfWeek = (expect) => {
  expect(firstDayOfWeek(new Date(1461665762122)).getTime()).toEqual(1461579362122);
};

export const days = (activeDate) => {
  const dates = [];
  const firstDate = firstDayOfWeek(activeDate);
  if (firstDate.getDate() !== activeDate.getDate()) {
    dates.push(firstDate);
  } else {
    dates.push(new Date(firstDate.setDate(firstDate.getDate() - DAYS_IN_A_WEEK)));
  }

  while (dates.length < NUMBER_OF_WEEKS * DAYS_IN_A_WEEK) {
    let previous = dates[dates.length - 1];
    dates.push(new Date(previous.setDate(previous.getDate() + 1)));
  }
  dates.forEach(date => console.log(date, activeDate, date.getDate() === activeDate.getDate()))
  return dates.map(
     date => ({
      date: date.getDate(),
      activeMonth: date.getMonth() === activeDate.getMonth(),
      activeDate: date.getDate() === activeDate.getDate(),
      future: date > activeDate
    })
  );
};

export const testDays = (expect) => {
  expect(days(new Date(1461665762122))).toEqual(
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
        { day: 7, activeMonth: false, activeDate: false, future: true }
    ]
  )
};
// props.date
export default (props) =>
  <section className="calendar">
    <table>
      <tr>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
        <th>S</th>
      </tr>
      <tr>
        <td className="active-month historic">25</td>
        <td className="active-month historic">26</td>
        <td className="active-month historic">27</td>
        <td className="active-month historic active-date">28</td>
        <td className="active-month">29</td>
        <td className="active-month">30</td>
        <td>01</td>
      </tr>
      <tr>
        <td>02</td>
        <td>03</td>
        <td>04</td>
        <td>05</td>
        <td>06</td>
        <td>07</td>
        <td>08</td>
      </tr>
    </table>
  </section>
