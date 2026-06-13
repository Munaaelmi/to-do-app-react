import { useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Buy milk",
      completed: false,
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  let visibleTodos = todos;

  if (filter === "active") {
    visibleTodos = todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    visibleTodos = todos.filter((todo) => todo.completed);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    if (!newTask.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTask("");
  }

  function handleDeleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleToggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleClearCompleted() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return (
    <div className="container">
      <h1 className="to-do-title">TODO APP</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input"
          placeholder="Add task..."
        />
        <button type="submit">Add</button>
      </form>
      <main>
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span className={todo.completed ? "lineThrough" : ""}>
                {todo.text}
              </span>
              <button
                className="deleteTask"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </li>
          ))}
        </ul>
        <p>
          You have {remainingTodos} remaining
          {remainingTodos === 1 ? " task" : " tasks"}.
        </p>

        <section className="filterButtons">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : " filterBtn "}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "active" : " filterBtn "}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : " filterBtn "}
          >
            Completed
          </button>
        </section>
      </main>

      <button onClick={handleClearCompleted} className="clearBtn">
        Clear completed tasks
      </button>
    </div>
  );
}

export default App;
