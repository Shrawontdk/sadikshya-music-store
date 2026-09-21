import apiClient from './client';

export const productsApi = {
  // Public: GET /api/products (optional ?categoryId=)
  getAll: async (categoryId = null) => {
    const params = categoryId ? { categoryId } : {};
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  // Public: GET /api/products/{id}
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Admin only: POST /api/products
  create: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // Admin only: PUT /api/products/{id}
  update: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // Admin only: DELETE /api/products/{id} (soft delete)
  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
