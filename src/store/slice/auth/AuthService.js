import axios from 'axios';

const API_URL = 'https://gigde-global-solutions-backend.onrender.com/api/auth';

const signup = async (data) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

const AuthService = {
  signup,
  login,
};

export default AuthService;