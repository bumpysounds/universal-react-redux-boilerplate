import fetch from 'isomorphic-fetch'

import config from '../config'

export const CALL_API = 'CALL_API'
export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

const api = store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types, endpoint, method, body } = callAPI
  const [ requestType, successType, failureType, shouldFetchType ] = types

  if (!__CLIENT__ && method !== GET) {
    return null
  }

  function actionWith(action, data) {
    const finalAction = { ...action, ...data }
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith({
    type: requestType
  }))

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (__CLIENT__ && method !== GET) {
    headers = {
      ...headers,
      'X-XSRF-Token': xsrfToken,
    }
  }

  // const jwt = store.getState().auth.jwt
  // if (!__CLIENT__ && jwt) {
  //   if (jwt) {
  //     headers = {
  //       ...headers,
  //       'Cookie': `jwt=${jwt}`
  //     }
  //   }
  // }

  const url = `${config.api.baseUrl}${endpoint}`

  return fetch(url, {
    method,
    headers,
    credentials: 'same-origin',
    body: JSON.stringify(body) // can be undefined, in case action creator doesn't provide body
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      if (json.error) {
        return Promise.reject(json.error)
      }
      // console.log('after err')
      // check if success, otherwise, Promise.reject(json)
      if (__CLIENT__) {
        // By default, it should always fetch on componentDidMount.
        // The only time we ever update shouldFetch back to true is when
        // we try to render it again on client.
        return next(actionWith({
          type: successType,
          data: json.data,
        }))
      } else {
        // This server side doesn't matter for non-GET methods, since we won't
        // POST or DELETE anything at this stage.
        // Also, this is the ONLY place where shouldFetch is false.
        // Only states who have GET methods to preload data will have shouldFetch
        next(actionWith({
          type: shouldFetchType,
          data: {
            shouldFetch: false
          }
        }))
        return next(actionWith({
          type: successType,
          data: json.data,
        }))
      }
    })



}
export default api
