import React from 'react'
import { connect } from 'react-redux'

import TodosList from './TodosList'
import { toggleTodo } from '../reducers/todos'
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../reducers/visibilityFilter'

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos.items, state.visibilityFilter)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

function getVisibleTodos(items, filter) {
  switch (filter) {
    case SHOW_ALL:
      return items
    case SHOW_COMPLETED:
      return items.filter(t => t.completed)
    case SHOW_ACTIVE:
      return items.filter(t => !t.completed)
    default:
      return items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList)
