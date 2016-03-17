import React from 'react'

import FilterLinkWrapper from './FilterLinkWrapper'
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../reducers/visibilityFilter'

function Footer() {
  return (
    <p>
      Show:
      {" "}
      <FilterLinkWrapper filter={SHOW_ALL}>
        All
      </FilterLinkWrapper>
      {", "}
      <FilterLinkWrapper filter={SHOW_ACTIVE}>
        Active
      </FilterLinkWrapper>
      {", "}
      <FilterLinkWrapper filter={SHOW_COMPLETED}>
        Completed
      </FilterLinkWrapper>
    </p>
  )
}

export default Footer
