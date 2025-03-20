import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
