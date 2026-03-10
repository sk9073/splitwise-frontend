import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <header>
        <Link to="/" className="brand">Splitwise.</Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/signin" style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--border)' }}>Sign Up</Link>
        </div>
      </header>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
