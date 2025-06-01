import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Impact from './pages/Impact';
import Vision from './pages/Vision';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Planner from './pages/Planner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default App;