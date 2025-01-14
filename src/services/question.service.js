import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/question'
});

class QuestionService {
  async getQuestions(gameId) {
    try {
      const response = await apiClient.get(`/${gameId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  }

  async create(gameId, question) {
    try {
      const response = await apiClient.post(`/${gameId}`, question);
      return response.data;
    } catch (error) {
      console.error('Error creating question', error);
      throw error;
    }
  }

  async update(id, question) {
    try {
      const response = await apiClient.put(`/${id}`, question);
      return response.data;
    } catch (error) {
      console.error('Error updating question', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting question', error);
      throw error;
    }
  }
}

export default new QuestionService();