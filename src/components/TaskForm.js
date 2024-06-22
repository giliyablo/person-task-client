import React, { useState } from 'react';
import { createTask } from '../api';
import PropTypes from 'prop-types';

const TaskForm = ({ fetchTasks, persons }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateOfCreation, setDateOfCreation] = useState('');
  const [done, setDone] = useState(false);
  const [assignedPerson, setAssignedPerson] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ name, description, dateOfCreation, done, personAssigned: assignedPerson });
    setName('');
    setDescription('');
    setDateOfCreation('');
    setDone(false);
    setAssignedPerson('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={dateOfCreation}
        onChange={(e) => setDateOfCreation(e.target.value)}
        required
      />
      <label>
        Done:
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
      </label>
      <select
        value={assignedPerson}
        onChange={(e) => setAssignedPerson(e.target.value)}
        required
      >
        <option value="">Assign to</option>
        {persons.map(person => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

TaskForm.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  persons: PropTypes.array.isRequired 
};

export default TaskForm;
