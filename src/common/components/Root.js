import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

let Root

if (process.env.NODE_ENV === 'production') {
  const propTypes = {
    store: React.PropTypes.object.isRequired
  }
  function RootProd({ children, store }) {
    return (
      <Provider store={store}>
        <div>
          {children}
        </div>
      </Provider>
    )
  }

  RootProd.propTypes = propTypes
  Root = RootProd

} else {
  const DevTools = require('./DevTools').default

  const propTypes = {
    store: React.PropTypes.object.isRequired
  }
  function RootDev({ children, store }) {
    return (
      <Provider store={store}>
        <div>
          {children}
          <DevTools />
        </div>
      </Provider>
    )
  }

  RootDev.propTypes = propTypes
  Root = RootDev
}

export default Root
