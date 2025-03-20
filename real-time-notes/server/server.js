require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const noteRoutes = require('./routes/notes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow from all origins (adjust in production)
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('🔗 New client connected:', socket.id);

  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} joined room: ${roomId}`);

    // Notify others
    socket.to(roomId).emit('user-joined', { username });

    // Handle note updates
    socket.on('note-update', (updatedContent) => {
      socket.to(roomId).emit('note-update', updatedContent);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-left', { username });
      console.log(`${username} disconnected from room: ${roomId}`);
    });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
