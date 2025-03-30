import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { initializeStorage, tableService, clubService, bookingService, userService } from '@/lib/storageService';
import { Table, Club, Booking, User, TableInput, ClubInput, BookingInput, EntityId } from '@/lib/types';
import { toast } from 'sonner';

type StorageContextType = {
  // Tables
  tables: Table[];
  getTableById: (id: EntityId) => Table | undefined;
  addTable: (table: TableInput) => Table;
  updateTable: (table: Table) => Table | null;
  deleteTable: (id: EntityId) => boolean;
  availableTables: Table[];
  fullyBookedTables: Table[];
  
  // Clubs
  clubs: Club[];
  getClubById: (id: EntityId) => Club | undefined;
  addClub: (club: ClubInput) => Club;
  updateClub: (club: Club) => Club | null;
  deleteClub: (id: EntityId) => boolean;
  
  // Bookings
  bookings: Booking[];
  getBookingById: (id: EntityId) => Booking | undefined;
  addBooking: (booking: BookingInput) => Booking;
  updateBooking: (booking: Booking) => Booking | null;
  deleteBooking: (id: EntityId) => boolean;
  cancelBooking: (id: EntityId) => Booking | null;
  confirmBooking: (id: EntityId) => Booking | null;
  userBookings: Booking[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  cancelledBookings: Booking[];
  
  // User
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  
  // Refresh
  refreshData: () => void;
  isLoading: boolean;
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState<Table[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    try {
      initializeStorage();
      refreshData();
    } catch (error) {
      console.error('Error initializing storage:', error);
      toast.error('Failed to initialize data');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const refreshData = () => {
    setTables(tableService.getAll());
    setClubs(clubService.getAll());
    setBookings(bookingService.getAll());
    setCurrentUser(userService.getCurrentUser());
  };
  
  const getTableById = (id: EntityId) => tableService.getById(id);
  
  const addTable = (table: TableInput) => {
    const newTable = tableService.add(table);
    refreshData();
    return newTable;
  };
  
  const updateTable = (table: Table) => {
    const updated = tableService.update(table);
    refreshData();
    return updated;
  };
  
  const deleteTable = (id: EntityId) => {
    const deleted = tableService.delete(id);
    refreshData();
    return deleted;
  };
  
  const getClubById = (id: EntityId) => clubService.getById(id);
  
  const addClub = (club: ClubInput) => {
    const newClub = clubService.add(club);
    refreshData();
    return newClub;
  };
  
  const updateClub = (club: Club) => {
    const updated = clubService.update(club);
    refreshData();
    return updated;
  };
  
  const deleteClub = (id: EntityId) => {
    const deleted = clubService.delete(id);
    refreshData();
    return deleted;
  };
  
  const getBookingById = (id: EntityId) => bookingService.getById(id);
  
  const addBooking = (booking: BookingInput) => {
    const newBooking = bookingService.add(booking);
    refreshData();
    return newBooking;
  };
  
  const updateBooking = (booking: Booking) => {
    const updated = bookingService.update(booking);
    refreshData();
    return updated;
  };
  
  const deleteBooking = (id: EntityId) => {
    const deleted = bookingService.delete(id);
    refreshData();
    return deleted;
  };
  
  const cancelBooking = (id: EntityId) => {
    const cancelled = bookingService.cancelBooking(id);
    refreshData();
    return cancelled;
  };
  
  const confirmBooking = (id: EntityId) => {
    const confirmed = bookingService.confirmBooking(id);
    refreshData();
    return confirmed;
  };
  
  const userBookings = currentUser 
    ? bookings.filter(booking => booking.userId === currentUser._id || booking.userId === currentUser.id)
    : [];
    
  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate >= today && booking.status !== 'cancelled';
  });
  
  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate < today && booking.status !== 'cancelled';
  });
  
  const cancelledBookings = bookings.filter(booking => 
    booking.status === 'cancelled'
  );
  
  const login = (email: string, password: string) => {
    const user = userService.login(email, password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };
  
  const logout = () => {
    userService.logout();
    setCurrentUser(null);
  };
  
  const availableTables = tables.filter(table => table.availableSlots > 0);
  const fullyBookedTables = tables.filter(table => table.availableSlots === 0);
  
  const value = {
    tables,
    getTableById,
    addTable,
    updateTable,
    deleteTable,
    availableTables,
    fullyBookedTables,
    
    clubs,
    getClubById,
    addClub,
    updateClub,
    deleteClub,
    
    bookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking,
    cancelBooking,
    confirmBooking,
    userBookings,
    upcomingBookings,
    pastBookings,
    cancelledBookings,
    
    currentUser,
    login,
    logout,
    
    refreshData,
    isLoading,
  };
  
  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
