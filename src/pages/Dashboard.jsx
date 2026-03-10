import React from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch(err) {
      console.error(err);
    }
    navigate('/signin');
  };

  return (
    <div className="main-container" style={{ flex: 1, alignItems: 'flex-start', paddingTop: '4rem' }}>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2>Dashboard</h2>
        <p>Welcome to Splitwise. Your expense analytics will appear here.</p>
        <button onClick={handleSignOut} className="btn-primary" style={{ backgroundColor: '#ef4444' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
