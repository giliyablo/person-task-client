import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api';
import PropTypes from 'prop-types'; 

const TaskList = ({ tasks, fetchTasks, persons }) => {
  const [editingTask, setEditingTask] = useState(null);

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
                <select
                  value={editingTask.personAssigned ? editingTask.personAssigned.id : ''}
                  onChange={(e) => setEditingTask({ ...editingTask, personAssigned: persons.find(person => person.id === e.target.value) })}
                >
                  <option value="">Select a person</option>
                  {persons.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
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

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  fetchTasks: PropTypes.func.isRequired, 
  persons: PropTypes.array.isRequired
};

export default TaskList;
