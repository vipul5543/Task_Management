import React, { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    onUpdate(task.id, { ...task, status: newStatus });
  };

  if (isEditing) {
    return (
      <li>
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p className={task.status === 'Pending' ? 'status-pending' : 'status-completed'}>
        Status: {task.status}
      </p>
      <div className="task-actions">
        <button onClick={toggleStatus}>
          {task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
        </button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;

