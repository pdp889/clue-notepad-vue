import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/hand'
});

class HandService {
  async getHands(gameId) {
    try {
      const response = await apiClient.get(`/${gameId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hands:', error);
      throw error;
    }
  }

  async create(gameId, hand) {
    try {
      const response = await apiClient.post(`/${gameId}`, hand);
      return response.data;
    } catch (error) {
      console.error('Error creating hand', error);
      throw error;
    }
  }

  async update(id, hand) {
    try {
      const response = await apiClient.put(`/${id}`, hand);
      return response.data;
    } catch (error) {
      console.error('Error updating hand', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting hand', error);
      throw error;
    }
  }
}

export default new HandService();
