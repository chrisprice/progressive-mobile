import Shell from './shell/shell'
import React from 'react'
import ReactDOM from 'react-dom'

fetch('data.json')
  .then(res => res.json())
  .then(({ account, transactions }) => {
    ReactDOM.render(
      <Shell account={account}
             date={new Date()}
             transactions={transactions.reverse()}/>,
      document.querySelector('#react-container')
    )
  })
