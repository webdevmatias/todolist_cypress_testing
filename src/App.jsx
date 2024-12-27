import React, { useState } from 'react';
import './App.css';

function App() {
  // State hooks for count, text input, and todos list
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Function to add or edit a todo item
  const addOrEditTodo = () => {
    if (text.trim()) {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? text : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, text]);
      }
      setText('');
    }
  };

  // Functions to increment, decrement, and reset the counter
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Function to remove a todo item by index
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Function to start editing a todo item
  const startEditing = (index) => {
    setText(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="container p-4 w-full flex flex-col justify-center items-center">
      {/* Header section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">React Cypress Example</h1>
      </header>

      {/* Counter section */}
      <section className="mb-8 w-3/4 flex flex-col justify-center items-center bg-gray-300 p-4 rounded">
        <div className="flex flex-row gap-2">
          <h2 className="text-2xl font-semibold mb-4">Counter</h2>
          <p className="text-lg mb-4" data-testid="counter-value">Count: {count}</p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            data-testid="increment-btn"
            onClick={increment}
          >
            Increment
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            data-testid="decrement-btn"
            onClick={decrement}
          >
            Decrement
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            data-testid="reset-btn"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Todo list section */}
      <section className="bg-gray-300 p-4 rounded w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
        <div className="flex items-center mb-4">
          <input
            className="border border-gray-300 rounded p-2 flex-1 mr-2"
            data-testid="todo-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            data-testid="add-todo-btn"
            onClick={addOrEditTodo}
          >
            {editIndex !== null ? 'Edit Todo' : 'Add Todo'}
          </button>
        </div>
        <ul className="list-disc pl-5" data-testid="todo-list">
          {todos.map((todo, index) => (
            <div key={index} className="flex flex-row gap-4 mb-2">
              <li>{todo}</li>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeTodo(index)}
              >
                Remove
              </button>
              <button
                className="bg-blue-500 text-white px-2 rounded"
                onClick={() => startEditing(index)}
              >
                Edit
              </button>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
