import styled from 'styled-components';
import { MainContainer, AuthCard, PrimaryButton } from './AuthStyles';

export const DashboardContainer = styled(MainContainer)`
  align-items: flex-start;
  padding-top: 4rem;
`;

export const DashboardCard = styled(AuthCard)`
  max-width: 600px;
`;

export const SignOutButton = styled(PrimaryButton)`
  background-color: #ef4444;
  
  &:hover {
    background-color: #dc2626;
  }
`;
