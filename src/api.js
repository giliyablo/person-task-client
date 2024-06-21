import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust the URL as needed
r
export const getPersons = () => axios.get(`${API_URL}/persons`);
export const createPerson = (person) => axios.post(`${API_URL}/persons`, person);
export const updatePerson = (name, person) => axios.put(`${API_URL}/persons/${name}`, person);
export const deletePerson = (name) => axios.delete(`${API_URL}/persons/${name}`);

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const updateTask = (name, task) => axios.put(`${API_URL}/tasks/${name}`, task);
export const deleteTask = (name) => axios.delete(`${API_URL}/tasks/${name}`);
