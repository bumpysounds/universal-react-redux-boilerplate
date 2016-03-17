import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import Root from '../common/components/Root'
import configureStore from '../common/configureStore'
import routes from '../common/routes'


const initialState = __INITIAL_STATE__
const store = configureStore(initialState)

console.log('__INITIAL_STATE__', initialState)
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

ReactDOM.render(
  <Root store={store}>
    <Router routes={routes(store)} history={browserHistory} />
  </Root>,
  document.getElementById('root')
)
