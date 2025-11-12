import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.todos.map((todo, index) => (
    <Todo
      todo={todo}
      key={index}
      completeTodo={props.completeTodo}
      removeTodo={props.removeTodo}
      setEdit={setEdit}
    />
  ));
}

export default TodoList;