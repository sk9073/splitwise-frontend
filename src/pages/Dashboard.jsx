import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer, AuthCard, PrimaryButton } from '../styles/AuthStyles';

const DashboardContainer = styled(MainContainer)`
  align-items: flex-start;
  padding-top: 4rem;
`;

const DashboardCard = styled(AuthCard)`
  max-width: 600px;
`;

const SignOutButton = styled(PrimaryButton)`
  background-color: #ef4444;
  
  &:hover {
    background-color: #dc2626;
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch(err) {
      // Error signing out
    }
    navigate('/signin');
  };

  return (
    <DashboardContainer>
      <DashboardCard>
        <h2>Dashboard</h2>
        <p>Welcome to Splitwise. Your expense analytics will appear here.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <PrimaryButton onClick={() => navigate('/profile')}>
            Edit Profile
          </PrimaryButton>
          <SignOutButton onClick={handleSignOut}>
            Sign Out
          </SignOutButton>
        </div>
      </DashboardCard>
    </DashboardContainer>
  );
}
