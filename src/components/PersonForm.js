import React, { useState } from 'react';
import { createPerson } from '../api';
import PropTypes from 'prop-types'; 

const PersonForm = ({ fetchPersons }) => { 
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPerson({ name, availability });
    setName('');
    setAvailability(true);
    fetchPersons(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Person</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Person Name"
        required
      />
      <label>
        Availability:
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value === 'true')}
          required
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

PersonForm.propTypes = {
  fetchPersons: PropTypes.func.isRequired,
};

export default PersonForm;
