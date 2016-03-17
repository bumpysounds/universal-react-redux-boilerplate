import 'babel-polyfill'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import serverConfig from './config'
import apiV1 from '../api/v1'
import routes from '../common/routes'
import configureStore from '../common/configureStore'
import Root from '../common/components/Root'
import { fetchRouteComponentsData } from '../common/utils/serverFetchHelpers'

const app = express()
const port = process.env.PORT || serverConfig.server.port

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackConfigDev = require('../../webpack.config.dev')
  const compiler = webpack(webpackConfigDev)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfigDev.output.publicPath,
    hot: false
  }))
  app.use(morgan('dev'))
} else {

}

app.use('/public', express.static(path.resolve(__dirname, '../../public')))
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1', apiV1)

app.get('*', handleRender)

// function handleRender(req, res, err) {
//   res.send(renderFullPage());
// }

function handleRender(req, res, err) {
  const store = configureStore()
  // check jwt. if is authenticated, dispatch appropriate action.
  // route can get state to see if user is authenticated or not
  match({ routes: routes(store), location: req.url }, (err, redirect, routerProps) => {
    if (err) {
      // error during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (routerProps) {
      // we have a match
      // TODO: pull token from cookie and set it res.cookie! If exists, also set isAuthenticated to true
      Promise.all(fetchRouteComponentsData(store, routerProps, req))
        .then(() => {
          const appHtml = renderToString(
            <Root store={store}>
              <RouterContext {...routerProps} />
            </Root>
          )
          res.send(renderFullPage(appHtml, store.getState()))
        })
        .catch((error) => {
          // if auth error, redirect to home/login page via express which will forward to react-router
          // clear store; send an empty state
          console.log('json', error)
          if (error.code === 404) {
            res.status(404).send('404')
          }
          res.status(500).send("Something went wrong")
        })
    } else {
      // no match
      res.status(404).send('Not Found')
    }
  })
}

function renderFullPage(html, initialState) {
  html = html ? html : ''
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
        <script src="/public/js/${serverConfig.jsBundle}"></script>
      </body>
    </html>
    `
}

app.listen(port, () => {
  if (process.env.NODEMON === 'enabled') {
    console.log(`${process.env.NODE_ENV} server started on port ${port}. (webpack + nodemon)`)
  } else if (process.env.NODEMON === 'disabled') {
    console.log(`${process.env.NODE_ENV} server started on port ${port}. (webpack)`)
  } else {
    console.log(`${process.env.NODE_ENV} server started on port ${port}.`)
  }
})
