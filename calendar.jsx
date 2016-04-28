const FIRST_DAY_OF_WEEK = 1;

export const firstDayOfWeek = (date) => ({
  while (date.getDay() !== FIRST_DAY_OF_WEEK) {
    date = new Date(date.setDate(date.getDate() - 1));
  }
  return date;
});

export const testFirstDayOfWeek = (expect) => ({
  expect(firstDayOfWeek(new Date(1461665762122)).getTime()).toEqual(1461579362122);
});

const 


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
        <td className="active-month visible">25</td>
        <td className="active-month visible">26</td>
        <td className="active-month visible">27</td>
        <td className="active-month visible active-day">28</td>
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
