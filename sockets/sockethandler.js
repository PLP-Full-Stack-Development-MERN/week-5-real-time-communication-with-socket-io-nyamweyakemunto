module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);
  
      // Join Room Logic
      socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} joined room ${roomId}`);
  
        // Notify others in the room
        socket.to(roomId).emit('user-joined', { username });
  
        // Listen for real-time note updates
        socket.on('note-update', (updatedContent) => {
          // Broadcast updated note to others in room
          socket.to(roomId).emit('note-update', updatedContent);
        });
  
        // Handle disconnection
       
        socket.on('user-left', () => {
          console.log(`${username} left room ${roomId}`);
          socket.to(roomId).emit('user-left', { username });
        });
      });
    });
  };
  