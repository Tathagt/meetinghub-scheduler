import { createContext, useContext, ReactNode, useState } from 'react';
import { tableApi, clubApi, bookingApi, userApi } from '@/lib/api';
import { Table, Club, Booking, User } from '@/lib/types';
import { toast } from 'sonner';

type ApiContextType = {
  // Loading state
  isLoading: boolean;
  
  // Tables
  fetchTables: () => Promise<Table[]>;
  getTableById: (id: number) => Promise<Table | undefined>;
  addTable: (table: Omit<Table, 'id'>) => Promise<Table | undefined>;
  updateTable: (table: Table) => Promise<Table | undefined>;
  deleteTable: (id: number) => Promise<boolean>;
  
  // Clubs
  fetchClubs: () => Promise<Club[]>;
  getClubById: (id: number) => Promise<Club | undefined>;
  addClub: (club: Omit<Club, 'id'>) => Promise<Club | undefined>;
  updateClub: (club: Club) => Promise<Club | undefined>;
  deleteClub: (id: number) => Promise<boolean>;
  
  // Bookings
  fetchBookings: () => Promise<Booking[]>;
  fetchUserBookings: (userId: string) => Promise<Booking[]>;
  getBookingById: (id: number) => Promise<Booking | undefined>;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<Booking | undefined>;
  updateBooking: (booking: Booking) => Promise<Booking | undefined>;
  cancelBooking: (id: number) => Promise<Booking | undefined>;
  deleteBooking: (id: number) => Promise<boolean>;
  confirmBooking: (id: number) => Promise<Booking | undefined>;
  
  // Users
  fetchUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User | undefined>;
  
  // Auth
  login: (email: string, password: string) => Promise<User | undefined>;
  logout: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Table operations
  const fetchTables = async () => {
    setIsLoading(true);
    try {
      return await tableApi.getAll();
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to fetch tables');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const getTableById = async (id: number) => {
    setIsLoading(true);
    try {
      return await tableApi.getById(id);
    } catch (error) {
      console.error(`Error fetching table ${id}:`, error);
      toast.error('Failed to fetch table details');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addTable = async (table: Omit<Table, 'id'>) => {
    setIsLoading(true);
    try {
      const newTable = await tableApi.create(table);
      toast.success('Table added successfully');
      return newTable;
    } catch (error) {
      console.error('Error adding table:', error);
      toast.error('Failed to add table');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateTable = async (table: Table) => {
    setIsLoading(true);
    try {
      const updatedTable = await tableApi.update(table);
      toast.success('Table updated successfully');
      return updatedTable;
    } catch (error) {
      console.error(`Error updating table ${table.id}:`, error);
      toast.error('Failed to update table');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteTable = async (id: number) => {
    setIsLoading(true);
    try {
      await tableApi.delete(id);
      toast.success('Table deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting table ${id}:`, error);
      toast.error('Failed to delete table');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Club operations
  const fetchClubs = async () => {
    setIsLoading(true);
    try {
      return await clubApi.getAll();
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Failed to fetch clubs');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const getClubById = async (id: number) => {
    setIsLoading(true);
    try {
      return await clubApi.getById(id);
    } catch (error) {
      console.error(`Error fetching club ${id}:`, error);
      toast.error('Failed to fetch club details');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addClub = async (club: Omit<Club, 'id'>) => {
    setIsLoading(true);
    try {
      const newClub = await clubApi.create(club);
      toast.success('Club added successfully');
      return newClub;
    } catch (error) {
      console.error('Error adding club:', error);
      toast.error('Failed to add club');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateClub = async (club: Club) => {
    setIsLoading(true);
    try {
      const updatedClub = await clubApi.update(club);
      toast.success('Club updated successfully');
      return updatedClub;
    } catch (error) {
      console.error(`Error updating club ${club.id}:`, error);
      toast.error('Failed to update club');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteClub = async (id: number) => {
    setIsLoading(true);
    try {
      await clubApi.delete(id);
      toast.success('Club deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting club ${id}:`, error);
      toast.error('Failed to delete club');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Booking operations
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      return await bookingApi.getAll();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUserBookings = async (userId: string) => {
    setIsLoading(true);
    try {
      return await bookingApi.getUserBookings(userId);
    } catch (error) {
      console.error(`Error fetching bookings for user ${userId}:`, error);
      toast.error('Failed to fetch your bookings');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const getBookingById = async (id: number) => {
    setIsLoading(true);
    try {
      return await bookingApi.getById(id);
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      toast.error('Failed to fetch booking details');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    setIsLoading(true);
    try {
      const newBooking = await bookingApi.create(booking);
      toast.success('Booking created successfully');
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateBooking = async (booking: Booking) => {
    setIsLoading(true);
    try {
      const updatedBooking = await bookingApi.update(booking);
      toast.success('Booking updated successfully');
      return updatedBooking;
    } catch (error) {
      console.error(`Error updating booking ${booking.id}:`, error);
      toast.error('Failed to update booking');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelBooking = async (id: number) => {
    setIsLoading(true);
    try {
      const cancelledBooking = await bookingApi.cancel(id);
      toast.success('Booking cancelled successfully');
      return cancelledBooking;
    } catch (error) {
      console.error(`Error cancelling booking ${id}:`, error);
      toast.error('Failed to cancel booking');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteBooking = async (id: number) => {
    setIsLoading(true);
    try {
      await bookingApi.delete(id);
      toast.success('Booking deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      toast.error('Failed to delete booking');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const confirmBooking = async (id: number) => {
    setIsLoading(true);
    try {
      const confirmedBooking = await bookingApi.confirm(id);
      toast.success('Booking confirmed successfully');
      return confirmedBooking;
    } catch (error) {
      console.error(`Error confirming booking ${id}:`, error);
      toast.error('Failed to confirm booking');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  // User operations
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      return await userApi.getAll();
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const getUserById = async (id: string) => {
    setIsLoading(true);
    try {
      return await userApi.getById(id);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      toast.error('Failed to fetch user details');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Auth operations
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await userApi.login(email, password);
      setCurrentUser(user);
      localStorage.setItem('current_user', JSON.stringify(user));
      toast.success('Logged in successfully');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user');
    toast.success('Logged out successfully');
  };
  
  const value = {
    isLoading,
    
    fetchTables,
    getTableById,
    addTable,
    updateTable,
    deleteTable,
    
    fetchClubs,
    getClubById,
    addClub,
    updateClub,
    deleteClub,
    
    fetchBookings,
    fetchUserBookings,
    getBookingById,
    addBooking,
    updateBooking,
    cancelBooking,
    deleteBooking,
    confirmBooking,
    
    fetchUsers,
    getUserById,
    
    login,
    logout,
    currentUser,
    setCurrentUser,
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
