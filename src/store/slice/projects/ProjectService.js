import axios from 'axios';

const API_URL = 'http://localhost:5000/api/project';

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const fetchProjects = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};


const createProject = async (projectData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, projectData, getAuthHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to create project');
  }
};

const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
const updateProject = async (projectData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${projectData._id}`, projectData, getAuthHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || 'Failed to update project');
  }
};


const ProjectService = {
  fetchProjects,
  createProject,
  getProjectById,
  updateProject
};

export default ProjectService;