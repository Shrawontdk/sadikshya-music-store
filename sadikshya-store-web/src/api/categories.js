import apiClient from './client';

export const categoriesApi = {
  // Public: GET /api/categories
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // Admin only: POST /api/categories
  create: async (categoryData) => {
    const response = await apiClient.post('/categories', categoryData);
    return response.data;
  },
};
