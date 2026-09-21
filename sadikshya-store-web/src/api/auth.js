import apiClient from './client';

export const authApi = {
  // Register user: returns { token, fullName, email, role }
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Login user: returns { token, fullName, email, role }
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
};
