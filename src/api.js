import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Task API calls
export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
export const updateTask = (task) => axios.put(`${API_URL}/tasks/${task.id}`, task);

// Person API calls
export const getPersons = () => axios.get(`${API_URL}/persons`);
export const createPerson = (person) => axios.post(`${API_URL}/persons`, person);
export const deletePerson = (id) => axios.delete(`${API_URL}/persons/${id}`);
export const updatePerson = (person) => axios.put(`${API_URL}/persons/${person.id}`, person);
