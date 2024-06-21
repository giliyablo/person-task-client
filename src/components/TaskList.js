import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (name) => {
    await deleteTask(name);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.name}>
            {task.name} - Assigned to: {task.assignedPerson}
            <button onClick={() => handleDelete(task.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
