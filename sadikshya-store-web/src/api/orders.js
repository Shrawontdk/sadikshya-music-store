import apiClient from './client';

export const ordersApi = {
  // Customer: place an order
  // body: { shippingAddress, phoneNumber, items: [{ productId, quantity }] }
  create: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  // Customer: get own order history
  getMyOrders: async () => {
    const response = await apiClient.get('/orders/my');
    return response.data;
  },

  // Admin only: get all orders in the system
  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  // Admin only: update status
  // body is a plain string like "Shipped"
  updateStatus: async (orderId, statusString) => {
    const response = await apiClient.put(`/orders/${orderId}/status`, JSON.stringify(statusString), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
};
