import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api';
import PropTypes from 'prop-types'; 

const TaskList = ({ tasks, fetchTasks, persons }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (name) => {
    await deleteTask(name);
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
      <h2 style={{ textAlign: 'left' }}>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date of Creation</th>
            <th>Done</th>
            <th>Assigned to</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.name}>
              {editingTask && editingTask.name === task.name ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editingTask.name}
                      onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editingTask.dateOfCreation}
                      onChange={(e) => setEditingTask({ ...editingTask, dateOfCreation: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={editingTask.done}
                      onChange={(e) => setEditingTask({ ...editingTask, done: e.target.checked })}
                    />
                  </td>
                  <td>
                    <select
                      value={editingTask.personAssigned ? editingTask.personAssigned.name : ''}
                      onChange={(e) => setEditingTask({ ...editingTask, personAssigned: persons.find(person => person.name === e.target.value) })}
                    >
                      <option value="">Select a person</option>
                      {persons.map(person => (
                        <option key={person.name} value={person.name}>
                          {person.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(editingTask)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.dateOfCreation}</td>
                  <td>{task.done ? 'Done' : 'Not Done'}</td>
                  <td>{task.personAssigned ? task.personAssigned.name : 'None'}</td>
                  <td>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.name)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  fetchTasks: PropTypes.func.isRequired, 
  persons: PropTypes.array.isRequired
};

export default TaskList;
