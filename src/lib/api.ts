import axios from 'axios';
import { Table, Club, Booking, User, TableInput, ClubInput, BookingInput, UserInput } from './types';

// Determine the API URL based on the environment
// This will use the current hostname if not localhost
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : `${window.location.protocol}//${window.location.hostname}/api`;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Table API
export const tableApi = {
  getAll: async (): Promise<Table[]> => {
    const response = await api.get('/tables');
    return response.data;
  },
  
  getById: async (id: string): Promise<Table> => {
    const response = await api.get(`/tables/${id}`);
    return response.data;
  },
  
  create: async (table: TableInput): Promise<Table> => {
    const response = await api.post('/tables', table);
    return response.data;
  },
  
  update: async (table: Table): Promise<Table> => {
    const response = await api.put(`/tables/${table._id}`, table);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tables/${id}`);
  },
};

// Club API
export const clubApi = {
  getAll: async (): Promise<Club[]> => {
    const response = await api.get('/clubs');
    return response.data;
  },
  
  getById: async (id: string): Promise<Club> => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },
  
  create: async (club: ClubInput): Promise<Club> => {
    const response = await api.post('/clubs', club);
    return response.data;
  },
  
  update: async (club: Club): Promise<Club> => {
    const response = await api.put(`/clubs/${club._id}`, club);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/clubs/${id}`);
  },
};

// Booking API
export const bookingApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await api.get('/bookings');
    return response.data;
  },
  
  getById: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await api.get(`/users/${userId}/bookings`);
    return response.data;
  },
  
  create: async (booking: BookingInput): Promise<Booking> => {
    const response = await api.post('/bookings', booking);
    return response.data;
  },
  
  update: async (booking: Booking): Promise<Booking> => {
    const response = await api.put(`/bookings/${booking._id}`, booking);
    return response.data;
  },
  
  cancel: async (id: string): Promise<Booking> => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
  
  confirm: async (id: string): Promise<Booking> => {
    const response = await api.put(`/bookings/${id}/confirm`);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },
};

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  create: async (user: Omit<User, '_id'>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },
  
  update: async (user: User): Promise<User> => {
    const response = await api.put(`/users/${user._id}`, user);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
  
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      // For demo purposes, return a mock user when the API is not available
      if (window.location.hostname !== 'localhost') {
        console.log('Using mock login since API server might not be available');
        // Find a user with matching email from the demo data
        const mockUsers: User[] = [
          {
            _id: "user1",
            name: "John Doe",
            email: "john@example.com",
            role: "student",
            clubId: 1
          },
          {
            _id: "user2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "coordinator",
            clubId: 3
          },
          {
            _id: "user3",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin"
          }
        ];
        
        const mockUser = mockUsers.find(u => u.email === email);
        if (mockUser) {
          return mockUser;
        }
      }
      throw error;
    }
  },
  
  // Register
  register: async (userData: UserInput): Promise<User> => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};
