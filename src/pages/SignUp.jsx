import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
        <h2>Create an Account</h2>
        <p>Join Splitwise and start simplifying your debts.</p>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSignUp}>
          <FormGroup>
            <label>Full Name</label>
            <StyledInput 
              type="text" 
              placeholder="Elon Musk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </FormGroup>
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
              minLength="6"
            />
          </FormGroup>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
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
          Sign Up with Google
        </GoogleButton>

        <AuthFooter>
          Already have an account? <Link to="/signin">Sign In</Link>
        </AuthFooter>
      </AuthCard>
    </MainContainer>
  );
}
