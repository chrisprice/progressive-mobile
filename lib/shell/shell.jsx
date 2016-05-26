import React from 'react'
import 'normalize.css/normalize.css!'
import './shell.css!'
import './variables.css!'
import Navigation from '../navigation/navigation'
import Calendar from '../calendar/calendar'
import Timeline from '../timeline/timeline'

export default ({ account, date, transactions }) =>
  <div>
    <Navigation/>
    <Calendar date={date}/>
    <Timeline account={account} transactions={transactions}/>
  </div>
