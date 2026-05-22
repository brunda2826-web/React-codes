import React, { useState } from 'react';
import './App.css';

// Program 4: BCSL657B - VTU React Lab
// To-Do List Application using functional components and useState.
// Features: Add task, Delete task, Mark as completed/pending (toggle).

function ToDoFunction() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete VTU React Lab', completed: false },
    { id: 2, text: 'Study useState Hook', completed: true },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="todo-container">
      <h2>VTU BCSL657B - Program 4: To-Do List</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="task-input"
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <p className="summary">
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length} | Pending: {tasks.filter(t => !t.completed).length}
      </p>

      <ul className="task-list">
        {tasks.length === 0 && <li className="empty">No tasks yet. Add one above!</li>}
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={() => toggleTask(task.id)}>
              {task.completed ? '✅' : '⬜'} {task.text}
            </span>
            <button className="del-btn" onClick={() => deleteTask(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ToDoFunction />
    </div>
  );
}

export default App;
