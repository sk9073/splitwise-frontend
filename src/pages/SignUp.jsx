import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user in firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // TODO: Save the user's name in database or Firebase Auth profile.
      console.log("Created user:", userCredential.user.email, name);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p>Join Splitwise and start simplifying your debts.</p>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Elon Musk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength="6"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>OR</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className="btn-primary" 
          disabled={loading}
          style={{ 
            backgroundColor: 'white', 
            color: 'var(--text-main)', 
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
          Sign Up with Google
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
