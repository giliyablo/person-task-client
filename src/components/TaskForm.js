import React, { useState } from 'react';
import { createTask } from '../api';
import PropTypes from 'prop-types';

const TaskForm = ({ fetchTasks, persons, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfCreation, setDateOfCreation] = useState('');
  const [done, setDone] = useState(false);
  const [assignedPerson, setAssignedPerson] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ name, description, dateOfCreation, done, personAssigned: assignedPerson });
      setName('');
      setDescription('');
      setDateOfCreation('');
      setDone(false);
      setAssignedPerson('');
      fetchTasks();
      onSubmit(true); // Call onSubmit with success status
    } catch (error) {
      onSubmit(false); // Call onSubmit with failure status
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'left' }}>Add Task</h2>
      <table>
        <tbody>
          <tr>
            <td><label>Task Name:</label></td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task Name"
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Description:</label></td>
            <td>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Date of Creation:</label></td>
            <td>
              <input
                type="date"
                value={dateOfCreation}
                onChange={(e) => setDateOfCreation(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Done:</label></td>
            <td>
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td><label>Assign to:</label></td>
            <td>
              <select
                value={assignedPerson}
                onChange={(e) => setAssignedPerson(e.target.value)}
                required
              >
                <option value="">Assign to</option>
                {persons.map(person => (
                  <option key={person.name} value={person.name}>
                    {person.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

TaskForm.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  persons: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TaskForm;
