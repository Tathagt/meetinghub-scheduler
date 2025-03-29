
import axios from 'axios';
import { Table, Club, Booking, User } from './types';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
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
  
  getById: async (id: number): Promise<Table> => {
    const response = await api.get(`/tables/${id}`);
    return response.data;
  },
  
  create: async (table: Omit<Table, 'id'>): Promise<Table> => {
    const response = await api.post('/tables', table);
    return response.data;
  },
  
  update: async (table: Table): Promise<Table> => {
    const response = await api.put(`/tables/${table.id}`, table);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tables/${id}`);
  },
};

// Club API
export const clubApi = {
  getAll: async (): Promise<Club[]> => {
    const response = await api.get('/clubs');
    return response.data;
  },
  
  getById: async (id: number): Promise<Club> => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },
  
  create: async (club: Omit<Club, 'id'>): Promise<Club> => {
    const response = await api.post('/clubs', club);
    return response.data;
  },
  
  update: async (club: Club): Promise<Club> => {
    const response = await api.put(`/clubs/${club.id}`, club);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/clubs/${id}`);
  },
};

// Booking API
export const bookingApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await api.get('/bookings');
    return response.data;
  },
  
  getById: async (id: number): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await api.get(`/users/${userId}/bookings`);
    return response.data;
  },
  
  create: async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
    const response = await api.post('/bookings', booking);
    return response.data;
  },
  
  update: async (booking: Booking): Promise<Booking> => {
    const response = await api.put(`/bookings/${booking.id}`, booking);
    return response.data;
  },
  
  cancel: async (id: number): Promise<Booking> => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
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
  
  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },
  
  update: async (user: User): Promise<User> => {
    const response = await api.put(`/users/${user.id}`, user);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
  
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
};
