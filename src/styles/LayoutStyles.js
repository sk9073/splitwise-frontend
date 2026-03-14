import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AppHeader = styled.header`
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: -0.5px;
`;

export const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
`;

export const NavButton = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  border: 1px solid var(--border);
`;
