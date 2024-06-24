import React, { useState } from 'react';
import { createPerson } from '../api';
import PropTypes from 'prop-types'; 

const PersonForm = ({ fetchPersons }) => { 
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPerson({ name, availability });
      setName('');
      setAvailability(true);
      fetchPersons();
      setMessage('Person added successfully!');
    } catch (error) {
      setMessage('Failed to add person. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'left' }}>Add Person</h2>
      <table>
        <tbody>
          <tr>
            <td><label>Person Name:</label></td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Person Name"
                required
              />
            </td>
          </tr>
          <tr>
            <td><label>Availability:</label></td>
            <td>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value === 'true')}
                required
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Add</button>
            </td>
          </tr>
          {message && (
            <tr>
              <td colSpan="2">
                <p>{message}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
};

PersonForm.propTypes = {
  fetchPersons: PropTypes.func.isRequired,
};

export default PersonForm;
