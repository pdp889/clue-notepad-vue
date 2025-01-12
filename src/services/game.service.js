import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/game'
});

class GameService {
  async getGames() {
    try {
      const response = await apiClient.get('');
      return response.data;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }

  async getGame(id) {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game:', error);
      throw error;
    }
  }

  async create(game) {
    try {
      const response = await apiClient.post('', game);
      return response.data;
    } catch (error) {
      console.error('Error creating game', error);
      throw error;
    }
  }

  async update(id, game) {
    try {
      const response = await apiClient.put(`/${id}`, game);
      return response.data;
    } catch (error) {
      console.error('Error updating game', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting game', error);
      throw error;
    }
  }
}

export default new GameService();
