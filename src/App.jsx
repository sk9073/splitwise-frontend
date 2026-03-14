import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import {
  AppHeader,
  Brand,
  NavActions,
  NavLink,
  NavButton
} from './styles/LayoutStyles';

function App() {
  return (
    <Router>
      <AppHeader>
        <Brand to="/">Splitwise.</Brand>
        <NavActions>
          <NavLink to="/signin">Log In</NavLink>
          <NavButton to="/signup">Sign Up</NavButton>
        </NavActions>
      </AppHeader>
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
