import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Todos from './containers/Todos'
import NotFound from './containers/NotFound'

function routes(store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Todos} />
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default routes
