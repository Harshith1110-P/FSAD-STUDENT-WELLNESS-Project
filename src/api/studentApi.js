import api from './axios';

const studentApi = {
  getDashboard: async (studentId) => {
    try {
      const response = await api.get(`/student/dashboard?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load dashboard' };
    }
  },

  getHealthRecords: async (studentId) => {
    try {
      const response = await api.get(`/student/health-records?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load health records' };
    }
  },

  addHealthRecord: async (recordData) => {
    try {
      const response = await api.post('/student/health-records', recordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add record' };
    }
  },

  updateHealthRecord: async (id, recordData) => {
    try {
      const response = await api.put(`/student/health-records/${id}`, recordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update record' };
    }
  },

  deleteHealthRecord: async (id) => {
    try {
      const response = await api.delete(`/student/health-records/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete record' };
    }
  },

  getAppointments: async (studentId) => {
    try {
      const response = await api.get(`/student/appointments?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load appointments' };
    }
  },

  addAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/student/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('API Error (addAppointment):', error);
      if (!error.response) {
        throw { message: 'Network error: Backend server is unreachable' };
      }
      throw error.response.data || { message: 'Failed to book appointment' };
    }
  },

  getCounselingRequests: async (studentId) => {
    try {
      const response = await api.get(`/student/counseling?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load counseling requests' };
    }
  },

  requestCounseling: async (counselingData) => {
    try {
      const response = await api.post('/student/counseling', counselingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to request counseling' };
    }
  },

  getWellnessGoals: async (studentId) => {
    try {
      const response = await api.get(`/student/wellness-goals?studentId=${studentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to load wellness goals' };
    }
  },

  toggleWellnessGoal: async (goalId) => {
    try {
      const response = await api.put(`/student/wellness-goals/${goalId}/toggle`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update goal' };
    }
  },

  sendEmergencyAlert: async (alertData) => {
    try {
      const response = await api.post('/student/emergency-alert', alertData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send emergency alert' };
    }
  },

  cancelAppointment: async (appointmentId) => {
    try {
      const response = await api.delete(`/student/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel appointment' };
    }
  },
};

export default studentApi;