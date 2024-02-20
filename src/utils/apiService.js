import axios from 'axios';
import { formatScoreData } from './format';

const BASE_URL = 'http://localhost:3000';

const ApiServices = {
  fetch: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  getUserData: async (userId) => {
    return ApiServices.fetch(`${BASE_URL}/user/${userId}`);
  },

  getUserActivity: async (userId) => {
    return ApiServices.fetch(`${BASE_URL}/user/${userId}/activity`);
  },

  getUserAverageSessions: async (userId) => {
    return ApiServices.fetch(`${BASE_URL}/user/${userId}/average-sessions`);
  },

  getUserPerformance: async (userId) => {
    return ApiServices.fetch(`${BASE_URL}/user/${userId}/performance`);
  },

  getUserScore: async (userId) => {
    try {
      const userData = await ApiServices.getUserData(userId);
      const formattedScoreData = formatScoreData(userData);
      return formattedScoreData;
    } catch (error) {
      console.error('Error fetching user score:', error);
      throw error;
    }
  },
};

export default ApiServices;
