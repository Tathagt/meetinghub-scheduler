import { Table, Club, Booking, User } from './types';

// Storage keys
const TABLES_KEY = 'tables_data';
const CLUBS_KEY = 'clubs_data';
const BOOKINGS_KEY = 'bookings_data';
const USERS_KEY = 'users_data';
const CURRENT_USER_KEY = 'current_user';

// Default data
const defaultTables: Table[] = [
  {
    id: 1,
    name: "Conference Room A",
    capacity: 12,
    features: ["Projector", "Whiteboard", "Video Conference"],
    location: "Main Building, Floor 1",
    availableSlots: 5,
    totalSlots: 8,
  },
  {
    id: 2,
    name: "Meeting Room B",
    capacity: 8,
    features: ["Whiteboard", "Monitor"],
    location: "Main Building, Floor 2",
    availableSlots: 0,
    totalSlots: 8,
  },
  {
    id: 3,
    name: "Study Hall C",
    capacity: 20,
    features: ["Projector", "Large Space", "Audio System"],
    location: "Library Building, Floor 3",
    availableSlots: 3,
    totalSlots: 8,
  },
  {
    id: 4,
    name: "Discussion Room D",
    capacity: 6,
    features: ["Whiteboard", "Cozy Space"],
    location: "Student Center, Floor 1",
    availableSlots: 7,
    totalSlots: 8,
  },
  {
    id: 5,
    name: "Collaboration Space E",
    capacity: 15,
    features: ["Modular Tables", "Wall Monitors", "Whiteboard Wall"],
    location: "Innovation Hub, Floor 2",
    availableSlots: 2,
    totalSlots: 8,
  },
  {
    id: 6,
    name: "Seminar Room F",
    capacity: 30,
    features: ["Projector", "Podium", "Audio System"],
    location: "Academic Building, Floor 3",
    availableSlots: 4,
    totalSlots: 8,
  },
];

const defaultClubs: Club[] = [
  { id: 1, name: "Tech Club" },
  { id: 2, name: "Art Society" },
  { id: 3, name: "Debate Club" },
  { id: 4, name: "Photography Club" },
  { id: 5, name: "Robotics Team" },
  { id: 6, name: "Business Club" },
];

const defaultBookings: Booking[] = [
  {
    id: 1,
    tableId: 1,
    tableName: "Conference Room A",
    date: "2023-09-15",
    time: "14:00 - 16:00",
    clubId: 1,
    clubName: "Tech Club",
    purpose: "Weekly Meeting",
    status: "confirmed",
    attendees: 8,
    location: "Main Building, Floor 1",
    userId: "user1"
  },
  {
    id: 2,
    tableId: 2,
    tableName: "Meeting Room B",
    date: "2023-09-16",
    time: "10:00 - 11:30",
    clubId: 2,
    clubName: "Art Society",
    purpose: "Project Discussion",
    status: "pending",
    attendees: 5,
    location: "Main Building, Floor 2",
    userId: "user1"
  },
  {
    id: 3,
    tableId: 3,
    tableName: "Study Hall C",
    date: "2023-09-17",
    time: "15:00 - 17:00",
    clubId: 3,
    clubName: "Debate Club",
    purpose: "Competition Prep",
    status: "confirmed",
    attendees: 12,
    location: "Library Building, Floor 3",
    userId: "user2"
  },
  {
    id: 4,
    tableId: 4,
    tableName: "Discussion Room D",
    date: "2023-09-18",
    time: "13:00 - 14:30",
    clubId: 4,
    clubName: "Photography Club",
    purpose: "Portfolio Review",
    status: "confirmed",
    attendees: 6,
    location: "Student Center, Floor 1",
    userId: "user2"
  },
  {
    id: 5,
    tableId: 5,
    tableName: "Collaboration Space E",
    date: "2023-09-19",
    time: "11:00 - 13:00",
    clubId: 5,
    clubName: "Robotics Team",
    purpose: "Project Planning",
    status: "cancelled",
    attendees: 10,
    location: "Innovation Hub, Floor 2",
    userId: "user1"
  },
  {
    id: 6,
    tableId: 6,
    tableName: "Seminar Room F",
    date: "2023-09-20",
    time: "16:00 - 18:00",
    clubId: 6,
    clubName: "Business Club",
    purpose: "Guest Speaker",
    status: "confirmed",
    attendees: 25,
    location: "Academic Building, Floor 3",
    userId: "user3"
  },
];

const defaultUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    clubId: 1
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "coordinator",
    clubId: 3
  },
  {
    id: "user3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  }
];

// Initialize localStorage with default data if it doesn't exist
export const initializeStorage = () => {
  if (!localStorage.getItem(TABLES_KEY)) {
    localStorage.setItem(TABLES_KEY, JSON.stringify(defaultTables));
  }
  
  if (!localStorage.getItem(CLUBS_KEY)) {
    localStorage.setItem(CLUBS_KEY, JSON.stringify(defaultClubs));
  }
  
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(defaultBookings));
  }
  
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  
  // Set default user (for demo purposes)
  if (!localStorage.getItem(CURRENT_USER_KEY)) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUsers[0]));
  }
};

// Generic CRUD operations
const getAll = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const getById = <T extends { id: string | number }>(key: string, id: string | number): T | undefined => {
  const items = getAll<T>(key);
  return items.find(item => item.id === id);
};

const add = <T extends { id?: string | number }>(key: string, item: T): T => {
  const items = getAll<T>(key);
  
  // Generate a new ID if none exists
  if (!item.id) {
    const newId = items.length > 0 
      ? Math.max(...items.map(i => typeof i.id === 'number' ? i.id : 0)) + 1 
      : 1;
    item = { ...item, id: newId };
  }
  
  items.push(item as T);
  localStorage.setItem(key, JSON.stringify(items));
  return item as T;
};

const update = <T extends { id: string | number }>(key: string, item: T): T | null => {
  const items = getAll<T>(key);
  const index = items.findIndex(i => i.id === item.id);
  
  if (index === -1) return null;
  
  items[index] = item;
  localStorage.setItem(key, JSON.stringify(items));
  return item;
};

const remove = <T extends { id: string | number }>(key: string, id: string | number): boolean => {
  const items = getAll<T>(key);
  const filtered = items.filter(item => item.id !== id);
  
  if (filtered.length === items.length) return false;
  
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
};

// Specific services for our entities
export const tableService = {
  getAll: () => getAll<Table>(TABLES_KEY),
  getById: (id: number) => getById<Table>(TABLES_KEY, id),
  add: (table: Omit<Table, 'id'>) => add<Table>(TABLES_KEY, table as Table),
  update: (table: Table) => update<Table>(TABLES_KEY, table),
  delete: (id: number) => remove<Table>(TABLES_KEY, id),
  getAvailable: () => getAll<Table>(TABLES_KEY).filter(table => table.availableSlots > 0),
  getFullyBooked: () => getAll<Table>(TABLES_KEY).filter(table => table.availableSlots === 0),
};

export const clubService = {
  getAll: () => getAll<Club>(CLUBS_KEY),
  getById: (id: number) => getById<Club>(CLUBS_KEY, id),
  add: (club: Omit<Club, 'id'>) => add<Club>(CLUBS_KEY, club as Club),
  update: (club: Club) => update<Club>(CLUBS_KEY, club),
  delete: (id: number) => remove<Club>(CLUBS_KEY, id),
};

export const bookingService = {
  getAll: () => getAll<Booking>(BOOKINGS_KEY),
  getById: (id: number) => getById<Booking>(BOOKINGS_KEY, id),
  add: (booking: Omit<Booking, 'id'>) => {
    // When adding a booking, update the table's availableSlots
    const newBooking = add<Booking>(BOOKINGS_KEY, booking as Booking);
    
    if (newBooking && newBooking.tableId) {
      const table = tableService.getById(newBooking.tableId);
      if (table && table.availableSlots > 0) {
        tableService.update({
          ...table,
          availableSlots: table.availableSlots - 1
        });
      }
    }
    
    return newBooking;
  },
  update: (booking: Booking) => update<Booking>(BOOKINGS_KEY, booking),
  delete: (id: number) => {
    const booking = bookingService.getById(id);
    
    if (booking && booking.tableId && booking.status !== 'cancelled') {
      // When cancelling a booking, update the table's availableSlots
      const table = tableService.getById(booking.tableId);
      if (table) {
        tableService.update({
          ...table,
          availableSlots: table.availableSlots + 1
        });
      }
    }
    
    return remove<Booking>(BOOKINGS_KEY, id);
  },
  cancelBooking: (id: number) => {
    const booking = bookingService.getById(id);
    
    if (booking) {
      // Instead of deleting, mark as cancelled and update table slots
      const updatedBooking = {
        ...booking,
        status: 'cancelled' as const
      };
      
      if (booking.status !== 'cancelled' && booking.tableId) {
        const table = tableService.getById(booking.tableId);
        if (table) {
          tableService.update({
            ...table,
            availableSlots: table.availableSlots + 1
          });
        }
      }
      
      return update<Booking>(BOOKINGS_KEY, updatedBooking);
    }
    
    return null;
  },
  confirmBooking: (id: number) => {
    const booking = bookingService.getById(id);
    
    if (booking) {
      // Update status to confirmed
      const updatedBooking = {
        ...booking,
        status: 'confirmed' as const
      };
      
      return update<Booking>(BOOKINGS_KEY, updatedBooking);
    }
    
    return null;
  },
  getUserBookings: (userId: string) => getAll<Booking>(BOOKINGS_KEY).filter(booking => booking.userId === userId),
  getUpcomingBookings: () => {
    const today = new Date();
    return getAll<Booking>(BOOKINGS_KEY)
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= today && booking.status !== 'cancelled';
      });
  },
  getPastBookings: () => {
    const today = new Date();
    return getAll<Booking>(BOOKINGS_KEY)
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate < today && booking.status !== 'cancelled';
      });
  },
  getCancelledBookings: () => getAll<Booking>(BOOKINGS_KEY).filter(booking => booking.status === 'cancelled'),
};

export const userService = {
  getAll: () => getAll<User>(USERS_KEY),
  getById: (id: string) => getById<User>(USERS_KEY, id),
  add: (user: Omit<User, 'id'>) => add<User>(USERS_KEY, user as User),
  update: (user: User) => update<User>(USERS_KEY, user),
  delete: (id: string) => remove<User>(USERS_KEY, id),
  
  // Auth related functions (simplified for demo)
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  login: (email: string, password: string): User | null => {
    // For demo purposes, we'll just find a user with the provided email
    // In a real app, you'd also verify the password hash
    const users = getAll<User>(USERS_KEY);
    const user = users.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  },
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
