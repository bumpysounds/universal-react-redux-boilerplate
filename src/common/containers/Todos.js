import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodosAddWrapper from '../components/TodosAddWrapper'
import TodosListWrapper from '../components/TodosListWrapper'
import Footer from '../components/Footer'
import { fetchTodosIfNeeded } from '../reducers/todos'

// Route components should NEVER use mapStateToProps
class Todos extends Component {
  static fetchData(store) {
    const { dispatch } = store
    return Promise.all([
      dispatch(fetchTodosIfNeeded())
    ])
  }
  // can't access store here to see if data is already loaded (we don't want to rerender this container),
  // so we have to delegate the work to action creator: fetchTodosIfNeeded.
  // Also, catch errors here to redirect. For server, catch error at the root
  componentDidMount() {
    console.log('Todos: componentDidMount')
    const { dispatch } = this.props
    Promise.all([
      dispatch(fetchTodosIfNeeded())
    ]).catch((error) => {
      // TODO: setup diff error codes and redirects (also check for authorized code to redirect to login)
      console.error('Todos: Error fetching', error.code)
    })
  }
  render() {
    console.log('Todos: render')
    return (
      <div>
        <TodosAddWrapper />
        <TodosListWrapper />
        <Footer />
      </div>
    )
  }
}

export default connect()(Todos)
