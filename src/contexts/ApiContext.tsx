
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { tableApi, clubApi, bookingApi, userApi } from '@/lib/api';
import { Table, Club, Booking, User } from '@/lib/types';

type ApiContextType = {
  // Tables
  tables: Table[];
  loadTables: () => Promise<void>;
  getTableById: (id: string) => Promise<Table | null>;
  createTable: (table: Omit<Table, '_id'>) => Promise<Table | null>;
  updateTable: (table: Table) => Promise<Table | null>;
  deleteTable: (id: string) => Promise<boolean>;
  
  // Clubs
  clubs: Club[];
  loadClubs: () => Promise<void>;
  getClubById: (id: string) => Promise<Club | null>;
  createClub: (club: Omit<Club, '_id'>) => Promise<Club | null>;
  updateClub: (club: Club) => Promise<Club | null>;
  deleteClub: (id: string) => Promise<boolean>;
  
  // Bookings
  bookings: Booking[];
  loadBookings: () => Promise<void>;
  getUserBookings: (userId: string) => Promise<Booking[]>;
  getBookingById: (id: string) => Promise<Booking | null>;
  createBooking: (booking: Omit<Booking, '_id'>) => Promise<Booking | null>;
  updateBooking: (booking: Booking) => Promise<Booking | null>;
  cancelBooking: (id: string) => Promise<Booking | null>;
  confirmBooking: (id: string) => Promise<Booking | null>;
  deleteBooking: (id: string) => Promise<boolean>;
  
  // User/Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: Omit<User, '_id'>) => Promise<User | null>;
  logout: () => void;
  
  // State
  loading: boolean;
  error: string | null;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load user from localStorage on initialization
  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  // Tables
  const loadTables = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tableApi.getAll();
      setTables(data);
    } catch (err) {
      setError('Failed to load tables');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getTableById = async (id: string): Promise<Table | null> => {
    setLoading(true);
    setError(null);
    try {
      const table = await tableApi.getById(id);
      return table;
    } catch (err) {
      setError('Failed to get table');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const createTable = async (table: Omit<Table, '_id'>): Promise<Table | null> => {
    setLoading(true);
    setError(null);
    try {
      const newTable = await tableApi.create(table);
      setTables([...tables, newTable]);
      return newTable;
    } catch (err) {
      setError('Failed to create table');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const updateTable = async (table: Table): Promise<Table | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedTable = await tableApi.update(table);
      setTables(tables.map(t => t._id === updatedTable._id ? updatedTable : t));
      return updatedTable;
    } catch (err) {
      setError('Failed to update table');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteTable = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await tableApi.delete(id);
      setTables(tables.filter(t => t._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete table');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Clubs
  const loadClubs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clubApi.getAll();
      setClubs(data);
    } catch (err) {
      setError('Failed to load clubs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getClubById = async (id: string): Promise<Club | null> => {
    setLoading(true);
    setError(null);
    try {
      const club = await clubApi.getById(id);
      return club;
    } catch (err) {
      setError('Failed to get club');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const createClub = async (club: Omit<Club, '_id'>): Promise<Club | null> => {
    setLoading(true);
    setError(null);
    try {
      const newClub = await clubApi.create(club);
      setClubs([...clubs, newClub]);
      return newClub;
    } catch (err) {
      setError('Failed to create club');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const updateClub = async (club: Club): Promise<Club | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedClub = await clubApi.update(club);
      setClubs(clubs.map(c => c._id === updatedClub._id ? updatedClub : c));
      return updatedClub;
    } catch (err) {
      setError('Failed to update club');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteClub = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await clubApi.delete(id);
      setClubs(clubs.filter(c => c._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete club');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Bookings
  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingApi.getAll();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const getUserBookings = async (userId: string): Promise<Booking[]> => {
    setLoading(true);
    setError(null);
    try {
      const userBookings = await bookingApi.getUserBookings(userId);
      return userBookings;
    } catch (err) {
      setError('Failed to get user bookings');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const getBookingById = async (id: string): Promise<Booking | null> => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingApi.getById(id);
      return booking;
    } catch (err) {
      setError('Failed to get booking');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const createBooking = async (booking: Omit<Booking, '_id'>): Promise<Booking | null> => {
    setLoading(true);
    setError(null);
    try {
      const newBooking = await bookingApi.create(booking);
      setBookings([...bookings, newBooking]);
      return newBooking;
    } catch (err) {
      setError('Failed to create booking');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const updateBooking = async (booking: Booking): Promise<Booking | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedBooking = await bookingApi.update(booking);
      setBookings(bookings.map(b => b._id === updatedBooking._id ? updatedBooking : b));
      return updatedBooking;
    } catch (err) {
      setError('Failed to update booking');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const cancelBooking = async (id: string): Promise<Booking | null> => {
    setLoading(true);
    setError(null);
    try {
      const cancelledBooking = await bookingApi.cancel(id);
      setBookings(bookings.map(b => b._id === cancelledBooking._id ? cancelledBooking : b));
      return cancelledBooking;
    } catch (err) {
      setError('Failed to cancel booking');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const confirmBooking = async (id: string): Promise<Booking | null> => {
    setLoading(true);
    setError(null);
    try {
      const confirmedBooking = await bookingApi.confirm(id);
      setBookings(bookings.map(b => b._id === confirmedBooking._id ? confirmedBooking : b));
      return confirmedBooking;
    } catch (err) {
      setError('Failed to confirm booking');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteBooking = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await bookingApi.delete(id);
      setBookings(bookings.filter(b => b._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete booking');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Auth
  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await userApi.login(email, password);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData: Omit<User, '_id'>): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await userApi.register(userData);
      return user;
    } catch (err) {
      setError('Registration failed.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const value = {
    tables,
    loadTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable,
    
    clubs,
    loadClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    
    bookings,
    loadBookings,
    getUserBookings,
    getBookingById,
    createBooking,
    updateBooking,
    cancelBooking,
    confirmBooking,
    deleteBooking,
    
    currentUser,
    login,
    register,
    logout,
    
    loading,
    error,
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};
