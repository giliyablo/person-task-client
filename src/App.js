import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PersonList from './components/PersonList';
import TaskList from './components/TaskList';
import PersonForm from './components/PersonForm';
import TaskForm from './components/TaskForm';
import { getTasks, getPersons } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchPersons();
  }, []);

  const fetchTasks = async () => {
    const responseTasks = await getTasks();
    setTasks(responseTasks.data);
  };

  const fetchPersons = async () => {
    const responsePersons = await getPersons();
    setPersons(responsePersons.data);
  };

  const handleFormSubmit = (success, formType) => {
    if (success) {
      setMessage(`${formType} submitted successfully!`);
    } else {
      setMessage(`Failed to submit ${formType}.`);
    }
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Person and Task Management</h1>
      </header>
      
      <Router>
        <div className="App-container">
          <nav className="App-sidebar">
            <h2>Menu</h2>
            <ul>
              <li>
                <Link to="/person-list">Person List</Link>
              </li>
              <li>
                <Link to="/task-list">Task List</Link>
              </li>
              <li>
                <Link to="/person-form">Person Form</Link>
              </li>
              <li>
                <Link to="/task-form">Task Form</Link>
              </li>
            </ul>
          </nav>

          <main className="App-content">
            {message && <div className="message">{message}</div>}
            <Routes>
              <Route path="/person-list" element={<PersonList persons={persons} fetchPersons={fetchPersons} />} />
              <Route path="/task-list" element={<TaskList tasks={tasks} fetchTasks={fetchTasks} persons={persons} />} />
              <Route path="/person-form" element={<PersonForm fetchPersons={fetchPersons} onSubmit={(success) => handleFormSubmit(success, 'Person Form')} />} />
              <Route path="/task-form" element={<TaskForm fetchTasks={fetchTasks} persons={persons} onSubmit={(success) => handleFormSubmit(success, 'Task Form')} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
