import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../utils/mockData';
import { formatScoreData } from './format';

const MockService = {
  getUserData: async (userId) => {
    try {
      const userIdNumber = parseInt(userId, 10);
      const user = USER_MAIN_DATA.find((userData) => userData.id === userIdNumber);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  getUserActivity: async (userId) => {
    try {
      const userActivity = USER_ACTIVITY.find((activity) => activity.userId === userId);
      if (!userActivity) {
        throw new Error(`Activity data for user with ID ${userId} not found`);
      }
      return userActivity;
    } catch (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }
  },

  getUserAverageSessions: async (userId) => {
    try {
      const averageSessions = USER_AVERAGE_SESSIONS.find((sessions) => sessions.userId === userId);
      if (!averageSessions) {
        throw new Error(`Average session data for user with ID ${userId} not found`);
      }
      return averageSessions;
    } catch (error) {
      console.error('Error fetching user average sessions:', error);
      throw error;
    }
  },

  getUserPerformance: async (userId) => {
    try {
      const performanceData = USER_PERFORMANCE.find((performance) => performance.userId === userId);
      if (!performanceData) {
        throw new Error(`Performance data for user with ID ${userId} not found`);
      }
      return performanceData;
    } catch (error) {
      console.error('Error fetching user performance:', error);
      throw error;
    }
  },

  getUserScore: async (userId) => {
    try {
      const userData = await MockService.getUserData(userId);
      const formattedScoreData = formatScoreData(userData);
      return formattedScoreData;
    } catch (error) {
      console.error('Error fetching user score:', error);
      throw error;
    }
  },
};

export default MockService;
