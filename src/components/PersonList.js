import React, { useState, useEffect } from 'react';
import { getPersons, deletePerson } from '../api';

const PersonList = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const response = await getPersons();
    setPersons(response.data);
  };

  const handleDelete = async (name) => {
    await deletePerson(name);
    fetchPersons();
  };

  return (
    <div>
      <h2>Persons</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name}
            <button onClick={() => handleDelete(person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
