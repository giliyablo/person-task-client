import React from 'react';
import PersonList from './components/PersonList';
import TaskList from './components/TaskList';
import PersonForm from './components/PersonForm';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Person and Task Management</h1>
      </header>
      <main>
        <PersonForm />
        <PersonList />
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
