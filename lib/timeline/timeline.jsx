import React from 'react'
import './timeline.css!'
import 'react-virtualized/styles.css!'
import { AutoSizer, VirtualScroll } from 'react-virtualized'
import Transaction from '../transaction/transaction'
import moment from 'moment'
import d3 from 'd3'
import { bubble, BUBBLE_SIZE, graph } from '../graph/graph'

if (System.env === 'development') {
  System.import('../../test/timelineSpec.js')
}

const DATE_FORMAT = 'ddd Do MMM'

export const generateRows = (transactions, activeFormattedDate) =>
  transactions.reduce((rows, transaction, index) => {
    const previousFormattedDate = rows.length && rows[rows.length - 1].formattedDate
    const date = moment(transaction.created)
    const formattedDate = date.format(DATE_FORMAT)
    if (previousFormattedDate !== formattedDate) {
      const row = {
        date,
        formattedDate,
        account_balance: transaction.account_balance,
        first: index === 0,
        active: activeFormattedDate === formattedDate,
        firstDayOfWeek: date.weekday() === 0
      }
      rows = [ ...rows, row ]
    }
    const row = { date, formattedDate, transaction }
    rows = [ ...rows, row ]
    return rows
  }, [])

const formatCurrency = (amount) =>
  (amount / 100).toFixed(2)

const day = (row) =>
  <div className="timeline-day">
    <svg viewBox={`0 0 ${BUBBLE_SIZE} ${BUBBLE_SIZE}`}
      ref={node => node && d3.select(node).datum(row).call(bubble)}>
    </svg>
    <h2>{row.formattedDate} {/*force space*/}
      <span className="pull-right">
        £{formatCurrency(row.account_balance)} {/*force space*/}
        <span className="lighten">left</span>
      </span>
    </h2>
  </div>

const transaction = (account, transaction) =>
  <div className="timeline-transaction">
    <svg viewBox={`0 0 ${BUBBLE_SIZE} ${BUBBLE_SIZE}`}
      ref={node => node && d3.select(node).datum({ hidden: true }).call(bubble)}>
    </svg>
    <Transaction account={account} transaction={transaction} />
  </div>

const row = (account, row) => row.transaction ?
  transaction(account, row.transaction) : day(row)

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.visibleDates = []
    this.scrollTop = 0
  }

  updateScrollTop(scrollTop) {
    this.scrollTop = scrollTop
  }

  updateVisibleDates(rows, startIndex, stopIndex) {
    const previousDate = this.visibleDates[0]
    this.visibleDates =
      rows.filter((row, i) => startIndex <= i && i <= stopIndex)
        .map(row => row.formattedDate)
    if (previousDate != this.visibleDates[0]) {
      const date = rows[startIndex].date.toISOString()
      this.props.selectDate(date)
    }
  }

  render() {
    const { account, transactions, date } = this.props
    const formattedDate = moment(date).format(DATE_FORMAT)
    const rows = generateRows(transactions, formattedDate)
    const scrollToIndex = this.visibleDates.indexOf(formattedDate) > -1 ?
      undefined : rows.findIndex(r => r.formattedDate === formattedDate)
    return (
      <section className="timeline">
        <AutoSizer>
          {
            ({ height, width }) =>
              <div>
                <svg style={{ position: 'absolute' }} width={width} height={height}
                  ref={(node) => node && d3.select(node).datum({ rows, height, width, offset: -this.scrollTop }).call(graph)}>
                </svg>
                <VirtualScroll width={width} height={height}
                  rowCount={rows.length} rowHeight={50}
                  rowRenderer={({ index }) => row(account, rows[index])}
                  scrollToIndex={scrollToIndex} scrollToAlignment="start"
                  onRowsRendered={({ startIndex, stopIndex }) => this.updateVisibleDates(rows, startIndex, stopIndex)}
                  onScroll={({ scrollTop }) => this.updateScrollTop(scrollTop)}/>
              </div>
          }
        </AutoSizer>
      </section>
    )
  }
}
