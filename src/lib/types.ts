
// Define our data models
export interface Table {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  location: string;
  availableSlots: number;
  totalSlots: number;
}

export interface Club {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  tableId: number;
  tableName: string;
  date: string;
  time: string;
  clubId: number;
  clubName: string;
  purpose: string;
  status: "confirmed" | "pending" | "cancelled";
  attendees: number;
  location: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "coordinator";
  clubId?: number;
}
