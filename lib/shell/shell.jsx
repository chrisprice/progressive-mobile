import React from 'react'
import 'normalize.css/normalize.css!'
import './shell.css!'
import './variables.css!'
import Navigation from '../navigation/navigation'
import Calendar from '../calendar/calendar'
import Timeline from '../timeline/timeline'

export default ({ account, date, transactions, selectDate }) =>
  <div className="shell">
    <Navigation/>
    <Calendar date={date} selectDate={selectDate}/>
    <Timeline date={date} account={account} transactions={transactions} selectDate={selectDate}/>
  </div>
