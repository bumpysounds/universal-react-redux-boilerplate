import React from 'react'

import Todo from './Todo'

function TodosList({ todos, onClick }) {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onClick(todo.id) }
        />
      )}
    </ul>
  )
}

export default TodosList
