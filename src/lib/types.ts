
// Define our data models with MongoDB _id
export interface Table {
  _id: string;
  name: string;
  capacity: number;
  features: string[];
  location: string;
  availableSlots: number;
  totalSlots: number;
}

export interface Club {
  _id: string;
  name: string;
}

export interface Booking {
  _id: string;
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
  name: string;
  email: string;
  role: "student" | "admin" | "coordinator";
  clubId?: number;
  // Note: Password field is only used on the server side
}
