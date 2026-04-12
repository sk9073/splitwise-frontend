import axios from 'axios';
import { auth } from '../firebase/config';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase ID Token to all requests
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const userService = {
  register: async () => {
    try {
      const response = await apiClient.post('/users');
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  updateUserProfile: async (data) => {
    try {
      const response = await apiClient.patch('/users/me', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

export const contactService = {
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  sendRequest: async (email) => {
    try {
      const response = await apiClient.post('/contacts', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending contact request:', error);
      throw error;
    }
  },
  respondToRequest: async (contactId, status) => {
    try {
      // patch or put would work here, we used patch in the controller via update action which binds to both
      const response = await apiClient.patch(`/contacts/${contactId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error responding to contact request:', error);
      throw error;
    }
  },
  removeContact: async (contactId) => {
    try {
      const response = await apiClient.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing contact:', error);
      throw error;
    }
  }
};

export default apiClient;
