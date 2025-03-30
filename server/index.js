const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Data storage path
const DATA_DIR = path.join(__dirname, 'data');
const TABLES_FILE = path.join(DATA_DIR, 'tables.json');
const CLUBS_FILE = path.join(DATA_DIR, 'clubs.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files with default data if they don't exist
const initializeDataFile = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

// Default data
const defaultTables = [
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

const defaultClubs = [
  { id: 1, name: "Tech Club" },
  { id: 2, name: "Art Society" },
  { id: 3, name: "Debate Club" },
  { id: 4, name: "Photography Club" },
  { id: 5, name: "Robotics Team" },
  { id: 6, name: "Business Club" },
];

const defaultBookings = [
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

const defaultUsers = [
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

// Initialize data files
initializeDataFile(TABLES_FILE, defaultTables);
initializeDataFile(CLUBS_FILE, defaultClubs);
initializeDataFile(BOOKINGS_FILE, defaultBookings);
initializeDataFile(USERS_FILE, defaultUsers);

// Helper functions for CRUD operations
const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get all tables
app.get('/api/tables', (req, res) => {
  try {
    const tables = readData(TABLES_FILE);
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// Get table by ID
app.get('/api/tables/:id', (req, res) => {
  try {
    const tables = readData(TABLES_FILE);
    const table = tables.find(t => t.id === parseInt(req.params.id));
    
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch table' });
  }
});

// Add new table
app.post('/api/tables', (req, res) => {
  try {
    const tables = readData(TABLES_FILE);
    const newId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;
    
    const newTable = {
      id: newId,
      ...req.body
    };
    
    tables.push(newTable);
    writeData(TABLES_FILE, tables);
    
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
});

// Update table
app.put('/api/tables/:id', (req, res) => {
  try {
    const tables = readData(TABLES_FILE);
    const tableId = parseInt(req.params.id);
    const tableIndex = tables.findIndex(t => t.id === tableId);
    
    if (tableIndex === -1) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    tables[tableIndex] = {
      ...tables[tableIndex],
      ...req.body,
      id: tableId
    };
    
    writeData(TABLES_FILE, tables);
    res.json(tables[tableIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update table' });
  }
});

// Delete table
app.delete('/api/tables/:id', (req, res) => {
  try {
    const tables = readData(TABLES_FILE);
    const tableId = parseInt(req.params.id);
    const newTables = tables.filter(t => t.id !== tableId);
    
    if (newTables.length === tables.length) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    writeData(TABLES_FILE, newTables);
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete table' });
  }
});

// Get all clubs
app.get('/api/clubs', (req, res) => {
  try {
    const clubs = readData(CLUBS_FILE);
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

// Get club by ID
app.get('/api/clubs/:id', (req, res) => {
  try {
    const clubs = readData(CLUBS_FILE);
    const club = clubs.find(c => c.id === parseInt(req.params.id));
    
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch club' });
  }
});

// Add new club
app.post('/api/clubs', (req, res) => {
  try {
    const clubs = readData(CLUBS_FILE);
    const newId = clubs.length > 0 ? Math.max(...clubs.map(c => c.id)) + 1 : 1;
    
    const newClub = {
      id: newId,
      ...req.body
    };
    
    clubs.push(newClub);
    writeData(CLUBS_FILE, clubs);
    
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create club' });
  }
});

// Update club
app.put('/api/clubs/:id', (req, res) => {
  try {
    const clubs = readData(CLUBS_FILE);
    const clubId = parseInt(req.params.id);
    const clubIndex = clubs.findIndex(c => c.id === clubId);
    
    if (clubIndex === -1) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    clubs[clubIndex] = {
      ...clubs[clubIndex],
      ...req.body,
      id: clubId
    };
    
    writeData(CLUBS_FILE, clubs);
    res.json(clubs[clubIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update club' });
  }
});

// Delete club
app.delete('/api/clubs/:id', (req, res) => {
  try {
    const clubs = readData(CLUBS_FILE);
    const clubId = parseInt(req.params.id);
    const newClubs = clubs.filter(c => c.id !== clubId);
    
    if (newClubs.length === clubs.length) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    writeData(CLUBS_FILE, newClubs);
    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete club' });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Get bookings by user ID
app.get('/api/users/:userId/bookings', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const userBookings = bookings.filter(b => b.userId === req.params.userId);
    
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

// Add new booking
app.post('/api/bookings', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const tables = readData(TABLES_FILE);
    
    const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
    
    const newBooking = {
      id: newId,
      ...req.body
    };
    
    // Update table availability
    if (newBooking.tableId && newBooking.status !== 'cancelled') {
      const tableIndex = tables.findIndex(t => t.id === newBooking.tableId);
      
      if (tableIndex !== -1 && tables[tableIndex].availableSlots > 0) {
        tables[tableIndex].availableSlots -= 1;
        writeData(TABLES_FILE, tables);
      }
    }
    
    bookings.push(newBooking);
    writeData(BOOKINGS_FILE, bookings);
    
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking
app.put('/api/bookings/:id', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const tables = readData(TABLES_FILE);
    
    const bookingId = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const oldBooking = bookings[bookingIndex];
    const newBooking = {
      ...oldBooking,
      ...req.body,
      id: bookingId
    };
    
    // Handle status changes that affect table availability
    if (oldBooking.status !== 'cancelled' && newBooking.status === 'cancelled') {
      // Booking was cancelled, increase available slots
      const tableIndex = tables.findIndex(t => t.id === oldBooking.tableId);
      
      if (tableIndex !== -1) {
        tables[tableIndex].availableSlots += 1;
        writeData(TABLES_FILE, tables);
      }
    } else if (oldBooking.status === 'cancelled' && newBooking.status !== 'cancelled') {
      // Booking was uncancelled, decrease available slots
      const tableIndex = tables.findIndex(t => t.id === oldBooking.tableId);
      
      if (tableIndex !== -1 && tables[tableIndex].availableSlots > 0) {
        tables[tableIndex].availableSlots -= 1;
        writeData(TABLES_FILE, tables);
      }
    }
    
    bookings[bookingIndex] = newBooking;
    writeData(BOOKINGS_FILE, bookings);
    
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Cancel booking
app.put('/api/bookings/:id/cancel', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const tables = readData(TABLES_FILE);
    
    const bookingId = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const booking = bookings[bookingIndex];
    
    // Only update if not already cancelled
    if (booking.status !== 'cancelled') {
      booking.status = 'cancelled';
      
      // Update table availability
      const tableIndex = tables.findIndex(t => t.id === booking.tableId);
      
      if (tableIndex !== -1) {
        tables[tableIndex].availableSlots += 1;
        writeData(TABLES_FILE, tables);
      }
      
      bookings[bookingIndex] = booking;
      writeData(BOOKINGS_FILE, bookings);
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const bookings = readData(BOOKINGS_FILE);
    const tables = readData(TABLES_FILE);
    
    const bookingId = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const booking = bookings[bookingIndex];
    
    // If booking was not cancelled, update table availability
    if (booking.status !== 'cancelled') {
      const tableIndex = tables.findIndex(t => t.id === booking.tableId);
      
      if (tableIndex !== -1) {
        tables[tableIndex].availableSlots += 1;
        writeData(TABLES_FILE, tables);
      }
    }
    
    const newBookings = bookings.filter(b => b.id !== bookingId);
    writeData(BOOKINGS_FILE, newBookings);
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = readData(USERS_FILE);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const users = readData(USERS_FILE);
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  try {
    const users = readData(USERS_FILE);
    const userId = req.body.id || `user${users.length + 1}`;
    
    const newUser = {
      id: userId,
      ...req.body
    };
    
    users.push(newUser);
    writeData(USERS_FILE, users);
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const users = readData(USERS_FILE);
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      id: userId
    };
    
    writeData(USERS_FILE, users);
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const users = readData(USERS_FILE);
    const userId = req.params.id;
    const newUsers = users.filter(u => u.id !== userId);
    
    if (newUsers.length === users.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    writeData(USERS_FILE, newUsers);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      clubId: user.clubId
    };
    
    res.json(userResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, clubId } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      clubId
    });
    
    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      clubId: user.clubId
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
