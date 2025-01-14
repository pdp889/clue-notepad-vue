import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/card'
});

class CardService {
    async getCardTypes() {
      try {
        const response = await apiClient.get('/types');
        return response.data;
      } catch (error) {
        console.error('Error fetching hands:', error);
        throw error;
      }
    }

    async getCardCategories() {
        try {
          const response = await apiClient.get('/categories');
          return response.data;
        } catch (error) {
          console.error('Error fetching hands:', error);
          throw error;
        }
      }
}

export default new CardService();