import React from 'react'

function FilterLink({ children, active, onClick }) {
  if (active) {
    return (
      <span>{children}</span>
    )
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

export default FilterLink
