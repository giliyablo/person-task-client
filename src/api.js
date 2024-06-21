import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust the URL as needed

export const getPersons = () => axios.get(`${API_URL}/persons`);
export const createPerson = (person) => axios.post(`${API_URL}/persons`, person);
export const updatePerson = (id, person) => axios.put(`${API_URL}/persons/${id}`, person);
export const deletePerson = (id) => axios.delete(`${API_URL}/persons/${id}`);

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/tasks/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
