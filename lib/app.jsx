import Shell from './shell/shell'
import React from 'react'
import ReactDOM from 'react-dom'

let state = {
  date: null,
  transactions: [],
  account: null
}

const setState = (newState) => {
  state = { ...state, ...newState }
  ReactDOM.render(
    <Shell {...state} selectDate={selectDate}/>,
    document.querySelector('#react-container')
  )
}

const selectDate = (date) => setState({ date })

fetch('data.json')
  .then(res => res.json())
  .then(({ account, transactions }) => {
    // The transactions come in oldest first
    transactions.reverse()
    setState({
      date: transactions[0].created,
      account,
      transactions
    })
  })
