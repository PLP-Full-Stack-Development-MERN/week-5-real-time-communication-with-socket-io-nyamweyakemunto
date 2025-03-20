// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomCode.trim() !== '') {
      navigate(`/room/${roomCode}`);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/create-room');
      const { roomId } = response.data;
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Real-Time Collaborative Notes</h2>
      </header>

      <div>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px'
          }}
        />
        <button onClick={handleJoin}>Join Room</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleCreateRoom}>Create New Room</button>
      </div>
    </div>
  );
};

export default HomePage;
