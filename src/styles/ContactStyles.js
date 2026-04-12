import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  animation: slideUp 0.4s ease-out;
  width: 100%;
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: var(--text-main);
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
  border: 1px solid var(--border);
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  background: #f8fafc;
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--surface);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'secondary' ? '#e2e8f0' : 'var(--primary)'};
  color: ${props => props.variant === 'secondary' ? 'var(--text-main)' : 'white'};
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.variant === 'secondary' ? '#cbd5e1' : 'var(--primary-hover)'};
  }
`;

export const ContactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

export const ContactCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: #f8fafc;
  border: 1px solid var(--border);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export const SuccessText = styled.p`
  color: #10b981;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;
