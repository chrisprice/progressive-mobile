import React from 'react'
import classNames from 'classnames'
import './transaction.css!'
import moment from 'moment'

const classes = (tx) => classNames({
  'transaction': true,
  'paid': tx.amount < 0
})

const formatTime = (timestamp) =>
  moment(timestamp).format('HH:mm')

const formatCurrency = (amount) =>
  (amount / 100).toFixed(2)

export default (props) =>
  <div className={classes(props.transaction)}>
    <div>
      <h3>{props.transaction.merchant.name}</h3>
      <p>
        {props.account.description}, {/*force space*/}
        {formatTime(props.transaction.created)}
      </p>
    </div>
    <div>
      <h3>{formatCurrency(props.transaction.amount)}</h3>
      <p></p>
    </div>
  </div>
