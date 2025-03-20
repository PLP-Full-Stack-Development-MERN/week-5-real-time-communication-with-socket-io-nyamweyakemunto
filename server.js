const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/notes');
const socketHandler = require('./sockets/sockethandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Import Socket Logic
socketHandler(io);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    server.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
