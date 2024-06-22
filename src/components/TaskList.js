import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = async (task) => {
    await updateTask(task);
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTask && editingTask.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editingTask.name}
                  onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
                <input
                  type="date"
                  value={editingTask.dateOfCreation}
                  onChange={(e) => setEditingTask({ ...editingTask, dateOfCreation: e.target.value })}
                />
                <input
                  type="checkbox"
                  checked={editingTask.done}
                  onChange={(e) => setEditingTask({ ...editingTask, done: e.target.checked })}
                />
                <button onClick={() => handleSave(editingTask)}>Save</button>
              </div>
            ) : (
              <div>
                {task.name} - {task.description} - {task.dateOfCreation} - {task.done ? 'Done' : 'Not Done'} - Assigned to: {task.personAssigned ? task.personAssigned.name : 'None'}
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
