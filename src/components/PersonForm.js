import React, { useState } from 'react';
import { createPerson } from '../api';

const PersonForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPerson({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Person</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default PersonForm;
