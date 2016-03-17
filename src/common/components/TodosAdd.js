import React from 'react'

function TodosAdd({ onSubmit }) {
  let inputNode = ''

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!inputNode.value.trim()) {
          return
        }
        onSubmit(inputNode.value)
        inputNode.value = ''
      }}>
        <input ref={node => {
          inputNode = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default TodosAdd
