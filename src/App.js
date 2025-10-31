import React, { useState, useEffect } from "react";
import API from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    if (!title.trim()) return;
    try {
      const res = await API.post("/", { title });
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 To-Do List</h1>
          <p className="subtitle">Stay organized. Stay productive.</p>
        </header>

        <TaskForm onAdd={addTask} />

        {loading ? (
          <p className="loading">⏳ Loading your tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">🎉 No tasks yet! Add one above.</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        )}

        <footer className="footer">
          <p>💡 Built with React Hooks & MERN Stack</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
