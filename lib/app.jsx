import Shell from './shell/shell'
import React from 'react'
import ReactDOM from 'react-dom'
import * as store from './store'

const setState = (newState) => {
  const state = store.setState(newState)
  ReactDOM.render(
    <Shell {...state} selectDate={selectDate}/>,
    document.querySelector('#react-container')
  )
}

const selectDate = (date) => setState({ date })

const fetchInitialState = () =>
  fetch('data.json')
    .then(res => res.json())
    .then(({ account, transactions }) => {
      // The transactions come in oldest first
      transactions.reverse()
      return {
        date: transactions[0].created,
        account,
        transactions
      }
    })

const getState = store.getState() ?
  Promise.resolve(store.getState()) : fetchInitialState()
getState.then(setState)
