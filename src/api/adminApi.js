import api from './axios';

const adminApi = {
  getAllStudents: async () => {
    try {
      const response = await api.get('/admin/students');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load students' };
    }
  },

  getAllHealthRecords: async () => {
    try {
      const response = await api.get('/admin/health-records');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load records' };
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load dashboard stats' };
    }
  },

  seedDatabase: async () => {
    try {
      const response = await api.post('/admin/seed');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to seed database' };
    }
  },

  createHealthRecord: async (recordData) => {
    try {
      const response = await api.post('/admin/health-records', recordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create health record' };
    }
  },

  deleteHealthRecord: async (recordId) => {
    try {
      const response = await api.delete(`/admin/health-records/${recordId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete health record' };
    }
  },
};

export default adminApi;