import styled from 'styled-components';

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const AuthCard = styled.div`
  background: var(--surface);
  padding: 2.5rem 3rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 440px;
  animation: slideUp 0.4s ease-out;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-main);
    text-align: center;
  }

  p {
    color: var(--text-muted);
    text-align: center;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: var(--primary);
    background-color: var(--surface);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  color: white;
  background: var(--primary);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 0.5rem;

  &:hover {
    background: var(--primary-hover);
  }

  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const GoogleButton = styled(PrimaryButton)`
  background-color: white;
  color: var(--text-main);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f8fafc;
  }
  
  img {
    width: 18px;
    height: 18px;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid var(--border);
  }

  span {
    padding: 0 1rem;
    color: var(--text-muted);
    font-size: 0.85rem;
  }
`;

export const AuthFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
  background: #fee2e2;
  padding: 0.5rem;
  border-radius: 8px;
`;
