import React from 'react'
import './timeline.css!'
import 'react-virtualized/styles.css!'
import { AutoSizer, VirtualScroll } from 'react-virtualized'
import Transaction from '../transaction/Transaction'
import moment from 'moment'

if (System.env === 'development') {
  System.import('../../test/timelineSpec.js')
}

const DATE_FORMAT = 'ddd Do MMM'

export const generateRows = (transactions) =>
  transactions.reduce((rows, transaction) => {
    const previousFormattedDate = rows.length && rows[rows.length - 1].formattedDate
    const date = moment(transaction.created)
    const formattedDate = date.format(DATE_FORMAT)
    if (previousFormattedDate !== formattedDate) {
      rows = [ ...rows, { date, formattedDate, account_balance: transaction.account_balance } ]
    }
    rows = [ ...rows, { date, formattedDate, transaction } ]
    return rows
  }, [])

const formatCurrency = (amount) =>
  (amount / 100).toFixed(2)

const day = (day) =>
  <div className="timeline-day">
    <h2>{day.formattedDate} {/*force space*/}
      <span className="pull-right">
        £{formatCurrency(day.account_balance)} {/*force space*/}
        <span className="lighten">left</span>
      </span>
    </h2>
  </div>

const transaction = (account, transaction) =>
  <div className="timeline-transaction">
    <Transaction account={account} transaction={transaction} />
  </div>

const row = (account, row) => row.transaction ?
  transaction(account, row.transaction) : day(row)

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.visibleDates = []
  }

  updateVisibleDates(rows, startIndex, stopIndex) {
    const previousDate = this.visibleDates[0]
    this.visibleDates =
      rows.filter((row, i) => startIndex <= i && i <= stopIndex)
        .map(row => row.date)
    if (previousDate != this.visibleDates[0]) {
      const date = rows[startIndex].date.toISOString()
      this.props.selectDate(date)
    }
  }

  render() {
    const { account, transactions, date } = this.props
    const rows = generateRows(transactions)
    const formattedDate = moment(date).format(DATE_FORMAT)
    const scrollToIndex = this.visibleDates.indexOf(formattedDate) > -1 ?
      undefined : rows.findIndex(r => r.date === formattedDate)
    return (
      <section className="timeline">
        <AutoSizer>
          {
            ({ height, width }) =>
              <VirtualScroll width={width} height={height}
                rowCount={rows.length} rowHeight={50}
                rowRenderer={({ index }) => row(account, rows[index])}
                scrollToIndex={scrollToIndex} scrollToAlignment="start"
                onRowsRendered={({ startIndex, stopIndex }) => this.updateVisibleDates(rows, startIndex, stopIndex)}/>
          }
        </AutoSizer>
      </section>
    )
  }
}
