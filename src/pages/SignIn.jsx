import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import {
  MainContainer,
  AuthCard,
  FormGroup,
  StyledInput,
  PrimaryButton,
  GoogleButton,
  Divider,
  AuthFooter,
  ErrorMessage
} from '../styles/AuthStyles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for JWT and pass it to backend eventually
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
    <MainContainer>
      <AuthCard>
        <h2>Welcome Back</h2>
        <p>Sign in to Splitwise to manage your expenses.</p>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <form onSubmit={handleSignIn}>
          <FormGroup>
            <label>Email Address</label>
            <StyledInput 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <StyledInput 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </FormGroup>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </PrimaryButton>
        </form>

        <Divider>
          <hr />
          <span>OR</span>
          <hr />
        </Divider>

        <GoogleButton 
          onClick={handleGoogleSignIn} 
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Sign In with Google
        </GoogleButton>
        
        <AuthFooter>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </AuthFooter>
      </AuthCard>
    </MainContainer>
  );
}
