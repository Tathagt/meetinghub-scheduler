
// Define our data models with MongoDB _id
export interface Table {
  _id: string;
  id?: number; // For backward compatibility
  name: string;
  capacity: number;
  features: string[];
  location: string;
  availableSlots: number;
  totalSlots: number;
}

export interface Club {
  _id: string;
  id?: number; // For backward compatibility
  name: string;
}

export interface Booking {
  _id: string;
  id?: number; // For backward compatibility
  tableId: string;
  tableName: string;
  date: string;
  time: string;
  clubId: string;
  clubName: string;
  purpose: string;
  status: "confirmed" | "pending" | "cancelled";
  attendees: number;
  location: string;
  userId: string;
}

export interface User {
  _id: string;
  id?: string; // For backward compatibility
  name: string;
  email: string;
  role: "student" | "admin" | "coordinator";
  clubId?: number;
  // Note: Password field is only used on the server side
}

// Helper types for context operations
export type TableInput = Omit<Table, '_id' | 'id'> & { _id?: string; id?: number };
export type ClubInput = Omit<Club, '_id' | 'id'> & { _id?: string; id?: number };
export type BookingInput = Omit<Booking, '_id' | 'id'> & { _id?: string; id?: number };
export type UserInput = Omit<User, '_id' | 'id'> & { _id?: string; id?: string };

// Generic ID type
export type EntityId = string | number;
