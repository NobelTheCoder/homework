import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import NavBar from './components/nav.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      
      <Routes>
        {/* Home page as "/" */}
        <Route path="/" element={<Home />} />
        
        {/* App page as "/app" */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
);
