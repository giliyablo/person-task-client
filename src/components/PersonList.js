import React, { useState } from 'react';
import { deletePerson, updatePerson } from '../api';
import PropTypes from 'prop-types'; 

const PersonList = ({ persons, fetchPersons }) => {
  const [editingPerson, setEditingPerson] = useState(null);

  const handleDelete = async (id) => {
    await deletePerson(id);
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
      <h2>Persons</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {editingPerson && editingPerson.id === person.id ? (
              <div>
                <input
                  type="text"
                  value={editingPerson.name}
                  onChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                />
                <input
                  type="checkbox"
                  checked={editingPerson.availability}
                  onChange={(e) => setEditingPerson({ ...editingPerson, availability: e.target.checked })}
                />
                <input
                  type="number"
                  value={editingPerson.tasksAssignedNumber}
                  onChange={(e) => setEditingPerson({ ...editingPerson, tasksAssignedNumber: e.target.value })}
                />
                <button onClick={() => handleSave(editingPerson)}>Save</button>
              </div>
            ) : (
              <div>
                {person.name} - {person.availability ? 'Available' : 'Not Available'} - Tasks Assigned: {person.tasksAssignedNumber}
                <button onClick={() => handleEdit(person)}>Edit</button>
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

PersonList.propTypes = {
  persons: PropTypes.array.isRequired, 
  fetchPersons: PropTypes.func.isRequired, 
};

export default PersonList;
