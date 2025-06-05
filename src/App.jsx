import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Extract from './pages/Extract';

function App() {
  const isLoggedIn = !!localStorage.getItem('igLoggedIn');

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/extract" /> : <Login />} />
      <Route path="/extract" element={isLoggedIn ? <Extract /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
