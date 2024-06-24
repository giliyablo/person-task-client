import React, { useState } from 'react';
import { deletePerson, updatePerson } from '../api';
import PropTypes from 'prop-types'; 

const PersonList = ({ persons, fetchPersons }) => {
  const [editingPerson, setEditingPerson] = useState(null);

  const handleDelete = async (name) => {
    await deletePerson(name);
    fetchPersons(); 
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
  };

  const handleSave = async (person) => {
    await updatePerson(person);
    setEditingPerson(null);
    fetchPersons(); 
  };

  return (
    <div>
      <h2 style={{ textAlign: 'Left' }}>Persons</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Availability</th>
            <th>Tasks Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person => (
            <tr key={person.name}>
              {editingPerson && editingPerson.name === person.name ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editingPerson.name}
                      onChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={editingPerson.availability}
                      onChange={(e) => setEditingPerson({ ...editingPerson, availability: e.target.checked })}
                    />
                  </td>
                  <td>{person.tasksAssignedNumber}</td>
                  <td>
                    <button onClick={() => handleSave(editingPerson)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{person.name}</td>
                  <td>{person.availability ? 'Available' : 'Not Available'}</td>
                  <td>{person.tasksAssignedNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(person)}>Edit</button>
                    <button onClick={() => handleDelete(person.name)}>Delete</button>
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

PersonList.propTypes = {
  persons: PropTypes.array.isRequired, 
  fetchPersons: PropTypes.func.isRequired, 
};

export default PersonList;
