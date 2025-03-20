// src/pages/RoomPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Adjust backend URL if deployed

const RoomPage = () => {
  const { roomId } = useParams();
  const [note, setNote] = useState('');
  const [users, setUsers] = useState([]);
  const username = `User${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    // Join room
    socket.emit('join-room', { roomId, username });

    // Fetch existing note
    axios.get(`http://localhost:5000/api/notes/${roomId}`).then(res => {
      if (res.data) setNote(res.data.content);
    });

    // Real-time note updates
    socket.on('note-update', (data) => {
      setNote(data);
    });

    // Track users
    socket.on('user-joined', (data) => {
      setUsers(prev => [...prev, data.username]);
    });

    socket.on('user-left', (data) => {
      setUsers(prev => prev.filter(u => u !== data.username));
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // Send note changes
  const handleChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);
    socket.emit('note-update', updatedNote);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Room: {roomId}</h2>
      </header>

      <textarea value={note} onChange={handleChange} />

      <h3>Online Users:</h3>
      <ul className="user-list">
        {users.map((u, idx) => (
          <li key={idx}>{u}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomPage;
