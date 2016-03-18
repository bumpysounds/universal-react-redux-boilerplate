import {
  CALL_API,
  GET
} from '../middlewares/api'

const TODOS_ADD = 'TODOS_ADD'
const TODOS_TOGGLE = 'TODOS_TOGGLE'
const TODOS_REQUEST = 'TODOS_REQUEST'
const TODOS_SUCCESS = 'TODOS_SUCCESS'
const TODOS_FAILURE = 'TODOS_FAILURE'
const TODOS_SHOULD_FETCH = 'TODOS_SHOULD_FETCH'

let id = 0

function item(state = {}, action) {
  switch (action.type) {
    case TODOS_ADD:
      return {
        id: id++,
        text: action.data.text,
        completed: false
      }
    case TODOS_TOGGLE:
      if (state.id !== action.data.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

function items(state = [], action) {
  switch (action.type) {
    case TODOS_ADD:
      return [
        ...state,
        item(undefined, action)
      ]
    case TODOS_TOGGLE:
      return state.map(t =>
        item(t, action)
      )
    default:
      return state
  }
}

export function todos(state = {
  isFetching: false,
  shouldFetch: true,
  items: [],
}, action) {
  switch (action.type) {
    case TODOS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case TODOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data
      }
    case TODOS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case TODOS_SHOULD_FETCH:
      return {
        ...state,
        shouldFetch: action.data.shouldFetch
      }
    case TODOS_ADD:
      return {
        ...state,
        items: items(state.items, action)
      }
    case TODOS_TOGGLE:
      return {
        ...state,
        items: items(state.items, action)
      }
    default:
      return state
  }
}

// Always send data in the data property to be consistent with API
export function todosAdd(text) {
  return {
    type: TODOS_ADD,
    data: {
      text
    }
  }
}

export function toggleTodo(id) {
  return {
    type: TODOS_TOGGLE,
    data: {
      id
    }
  }
}

export function fetchTodos(req) {
  return {
    [CALL_API]: {
      types: [TODOS_REQUEST, TODOS_SUCCESS, TODOS_FAILURE, TODOS_SHOULD_FETCH],
      endpoint: '/v1/todos',
      method: GET,
      req
    }
  }
}

export function shouldFetchTodos(val) {
  return {
    type: TODOS_SHOULD_FETCH,
    data: {
      shouldFetch: val
    }
  }
}

export function fetchTodosIfNeeded(req) {
  return (dispatch, getState) => {
    const todos = getState().todos
    // Condition: server already fetched, so change shouldFetch back to true,
    // but don't fetch
    if (!todos.shouldFetch) {
      dispatch(shouldFetchTodos(true))
      return null
    }
    return dispatch(fetchTodos(req))
  }
}
