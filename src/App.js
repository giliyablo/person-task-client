import React, { useState, useEffect } from 'react';
import PersonList from './components/PersonList';
import TaskList from './components/TaskList';
import PersonForm from './components/PersonForm';
import TaskForm from './components/TaskForm';
import { getTasks, getPersons } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchPersons();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const fetchPersons = async () => {
    const response = await getPersons();
    setPersons(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Person and Task Management</h1>
      </header>
      <main>
        <PersonForm fetchPersons={fetchPersons} />
        <PersonList persons={persons} fetchPersons={fetchPersons} />
        <TaskForm fetchTasks={fetchTasks} persons={persons} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} persons={persons} />
      </main>
    </div>
  );
}

export default App;
