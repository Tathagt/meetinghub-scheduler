
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/table-booking';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define MongoDB Schemas
const tableSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  features: [String],
  location: String,
  availableSlots: Number,
  totalSlots: Number
});

const clubSchema = new mongoose.Schema({
  name: String
});

const bookingSchema = new mongoose.Schema({
  tableId: Number,
  tableName: String,
  date: String,
  time: String,
  clubId: Number,
  clubName: String,
  purpose: String,
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  attendees: Number,
  location: String,
  userId: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'coordinator'],
    default: 'student'
  },
  clubId: Number,
  password: String // In a production app, this would be hashed
});

// Create models
const Table = mongoose.model('Table', tableSchema);
const Club = mongoose.model('Club', clubSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);

// Initialize default data if collections are empty
const initializeDefaultData = async () => {
  // Default tables
  const tablesCount = await Table.countDocuments();
  if (tablesCount === 0) {
    const defaultTables = [
      {
        name: "Conference Room A",
        capacity: 12,
        features: ["Projector", "Whiteboard", "Video Conference"],
        location: "Main Building, Floor 1",
        availableSlots: 5,
        totalSlots: 8,
      },
      {
        name: "Meeting Room B",
        capacity: 8,
        features: ["Whiteboard", "Monitor"],
        location: "Main Building, Floor 2",
        availableSlots: 0,
        totalSlots: 8,
      },
      {
        name: "Study Hall C",
        capacity: 20,
        features: ["Projector", "Large Space", "Audio System"],
        location: "Library Building, Floor 3",
        availableSlots: 3,
        totalSlots: 8,
      },
      {
        name: "Discussion Room D",
        capacity: 6,
        features: ["Whiteboard", "Cozy Space"],
        location: "Student Center, Floor 1",
        availableSlots: 7,
        totalSlots: 8,
      },
      {
        name: "Collaboration Space E",
        capacity: 15,
        features: ["Modular Tables", "Wall Monitors", "Whiteboard Wall"],
        location: "Innovation Hub, Floor 2",
        availableSlots: 2,
        totalSlots: 8,
      },
      {
        name: "Seminar Room F",
        capacity: 30,
        features: ["Projector", "Podium", "Audio System"],
        location: "Academic Building, Floor 3",
        availableSlots: 4,
        totalSlots: 8,
      },
    ];
    await Table.insertMany(defaultTables);
    console.log("Default tables created");
  }

  // Default clubs
  const clubsCount = await Club.countDocuments();
  if (clubsCount === 0) {
    const defaultClubs = [
      { name: "Tech Club" },
      { name: "Art Society" },
      { name: "Debate Club" },
      { name: "Photography Club" },
      { name: "Robotics Team" },
      { name: "Business Club" },
    ];
    await Club.insertMany(defaultClubs);
    console.log("Default clubs created");
  }

  // Default users
  const usersCount = await User.countDocuments();
  if (usersCount === 0) {
    const defaultUsers = [
      {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        role: "student",
        clubId: 1,
        password: "password"
      },
      {
        id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "coordinator",
        clubId: 3,
        password: "password"
      },
      {
        id: "user3",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        password: "password"
      }
    ];
    await User.insertMany(defaultUsers);
    console.log("Default users created");
  }

  // Default bookings
  const bookingsCount = await Booking.countDocuments();
  if (bookingsCount === 0) {
    const defaultBookings = [
      {
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
    await Booking.insertMany(defaultBookings);
    console.log("Default bookings created");
  }
};

// Initialize data
initializeDefaultData().catch(err => console.error('Error initializing data:', err));

// API Routes
// Tables
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

app.get('/api/tables/:id', async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch table' });
  }
});

app.post('/api/tables', async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
});

app.put('/api/tables/:id', async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update table' });
  }
});

app.delete('/api/tables/:id', async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete table' });
  }
});

// Clubs
app.get('/api/clubs', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

app.get('/api/clubs/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch club' });
  }
});

app.post('/api/clubs', async (req, res) => {
  try {
    const newClub = new Club(req.body);
    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create club' });
  }
});

app.put('/api/clubs/:id', async (req, res) => {
  try {
    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClub) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.json(updatedClub);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update club' });
  }
});

app.delete('/api/clubs/:id', async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete club' });
  }
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.get('/api/users/:userId/bookings', async (req, res) => {
  try {
    const userBookings = await Booking.find({ userId: req.params.userId });
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    
    // Update table availability if booking is not cancelled
    if (newBooking.status !== 'cancelled') {
      const table = await Table.findById(newBooking.tableId);
      if (table && table.availableSlots > 0) {
        table.availableSlots -= 1;
        await table.save();
      }
    }
    
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const oldStatus = booking.status;
    const newStatus = req.body.status;
    
    // Handle status changes that affect table availability
    if (oldStatus !== 'cancelled' && newStatus === 'cancelled') {
      // Booking was cancelled, increase available slots
      const table = await Table.findById(booking.tableId);
      if (table) {
        table.availableSlots += 1;
        await table.save();
      }
    } else if (oldStatus === 'cancelled' && newStatus !== 'cancelled') {
      // Booking was uncancelled, decrease available slots
      const table = await Table.findById(booking.tableId);
      if (table && table.availableSlots > 0) {
        table.availableSlots -= 1;
        await table.save();
      }
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

app.put('/api/bookings/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Only update if not already cancelled
    if (booking.status !== 'cancelled') {
      booking.status = 'cancelled';
      
      // Update table availability
      const table = await Table.findById(booking.tableId);
      if (table) {
        table.availableSlots += 1;
        await table.save();
      }
      
      await booking.save();
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

app.put('/api/bookings/:id/confirm', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Only update if currently pending
    if (booking.status === 'pending') {
      booking.status = 'confirmed';
      await booking.save();
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // If booking was not cancelled, update table availability
    if (booking.status !== 'cancelled') {
      const table = await Table.findById(booking.tableId);
      if (table) {
        table.availableSlots += 1;
        await table.save();
      }
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // In a production app, you would hash and securely compare passwords
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
