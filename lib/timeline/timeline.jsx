import React from 'react'
import './timeline.css!'
import Transaction from '../transaction/Transaction'
import moment from 'moment'

const groupByDay = (transactions) =>
  transactions.reduce((groups, tx) => {
    const date = moment(tx.created).format('ddd Do MMM')
    let group = groups.filter(g => g.date === date)[0]
    if (!group) {
      group = { date, transactions: [] }
      groups.push(group)
    }
    group.transactions.push(tx)
    return groups
  }, [])

const formatCurrency = (amount) =>
  (amount / 100).toFixed(2)

const transaction = (account, transaction) =>
  <li key={transaction.id}>
    <Transaction account={account} transaction={transaction} />
  </li>

const day = (account, group) =>
  <li className="day" key={group.date}>
    <h2>{group.date} {/*force space*/}
      <span className="pull-right">
        £{formatCurrency(group.transactions[0].account_balance)} {/*force space*/}
        <span className="lighten">left</span>
      </span>
    </h2>
    <ul>
      {group.transactions.map((tx) => transaction(account, tx))}
    </ul>
  </li>

export default ({ account, transactions }) => {
  const groups = groupByDay(transactions)
  return (
    <section className="timeline">
      <ul>
        {groups.map(group => day(account, group))}
      </ul>
    </section>
  )
}
