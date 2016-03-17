import React from 'react'
import { connect } from 'react-redux'

import FilterLink from './FilterLink'
import { setVisibilityFilter } from '../reducers/visibilityFilter'

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink)
