import React, { useState, useEffect } from 'react';
import { createTask, getPersons } from '../api';

const TaskForm = () => {
  const [name, setName] = useState('');
  const [assignedPerson, setAssignedPerson] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const response = await getPersons();
    setPersons(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ name, assignedPerson });
    setName('');
    setAssignedPerson('');
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
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
