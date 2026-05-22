import React, { useState } from 'react';
import './App.css';

// Program 8: BCSL657B - VTU React Lab
// Reminder Application:
// - Add tasks with name, due date, optional description
// - Display task list with name, due date, completion status
// - Filter: All | Completed | Pending

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Submit Lab Record', due: '2025-06-10', desc: 'BCSL657B React Lab', completed: false },
    { id: 2, name: 'Prepare for SEE', due: '2025-06-15', desc: '', completed: true },
  ]);

  const [form, setForm] = useState({ name: '', due: '', desc: '' });
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const addTask = () => {
    if (!form.name.trim() || !form.due) {
      setError('Task name and due date are required.');
      return;
    }
    setTasks([...tasks, { id: Date.now(), ...form, completed: false }]);
    setForm({ name: '', due: '', desc: '' });
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const filtered = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <div className="App">
      <div className="reminder-container">
        <h2>VTU BCSL657B – Program 8: Reminder Application</h2>

        {/* Add Form */}
        <div className="add-form">
          <input name="name" placeholder="Task Name *" value={form.name} onChange={handleChange} className="field" />
          <input name="due" type="date" value={form.due} onChange={handleChange} className="field" />
          <input name="desc" placeholder="Description (optional)" value={form.desc} onChange={handleChange} className="field" />
          {error && <span className="error">{error}</span>}
          <button className="add-btn" onClick={addTask}>+ Add Reminder</button>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['all', 'completed', 'pending'].map((f) => (
            <button
              key={f}
              className={`tab-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({
                f === 'all' ? tasks.length :
                f === 'completed' ? tasks.filter(t => t.completed).length :
                tasks.filter(t => !t.completed).length
              })
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="task-list">
          {filtered.length === 0 && <p className="empty">No tasks in this category.</p>}
          {filtered.map((task) => (
            <div key={task.id} className={`task-card ${task.completed ? 'done' : ''}`}>
              <div className="task-info">
                <span className="task-name">{task.completed ? '✅' : '🔔'} {task.name}</span>
                <span className="task-due">📅 {task.due}</span>
                {task.desc && <span className="task-desc">{task.desc}</span>}
              </div>
              <div className="task-actions">
                <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
                  {task.completed ? 'Undo' : 'Done'}
                </button>
                <button className="del-btn" onClick={() => deleteTask(task.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
