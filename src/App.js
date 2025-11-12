import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state isLoading

  // Load todos from local storage on initial render
  useEffect(() => {
    // Simulasikan waktu loading
    setTimeout(() => {
      const storedTodos = JSON.parse(localStorage.getItem('todos'));
      if (storedTodos) {
        setTodos(storedTodos);
      }
      setIsLoading(false); // Setelah data dimuat, set isLoading menjadi false
    }, 1500); // Tampilkan loading selama 1.5 detik
  }, []);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      {isLoading ? ( // Kondisional render loading atau aplikasi
        <div className="loading-container"> {/* Ini yang kita pertahankan */}
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <h1>Apa rencana Anda hari ini?</h1>
          <TodoForm onSubmit={addTodo} />
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </>
      )}
    </div>
  );
}

export default App;