import axios from 'axios';

const API_URL = 'https://gigde-global-solutions-backend.onrender.com/api/tasks';

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const fetchTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeaders());
  return response.data;
};

const updateTask = async ({ id, taskData }) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, getAuthHeaders());
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
const fetchTasksByProject = async (projectId) => {
  const response = await axios.get(`${API_URL}/project/${projectId}`, getAuthHeaders());
  return response.data;
};

const TaskService = {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchTasksByProject,
};

export default TaskService;

