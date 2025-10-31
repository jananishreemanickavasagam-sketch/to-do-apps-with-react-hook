import React from "react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(task._id, task.completed)}>
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)}>❌</button>
    </li>
  );
};

export default TaskItem;
