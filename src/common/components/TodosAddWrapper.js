import React from 'react'
import { connect } from 'react-redux'

import TodosAdd from './TodosAdd'
import { todosAdd } from '../reducers/todos'

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (text) => {
      dispatch(todosAdd(text))
    }
  }
}




export default connect(undefined, mapDispatchToProps)(TodosAdd)
