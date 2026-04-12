import { useState, useEffect } from 'react';
import { contactService } from '../services/api';
import {
  Container,
  Header,
  Section,
  SectionTitle,
  InputGroup,
  Input,
  Button,
  ContactList,
  ContactCard,
  UserInfo,
  Avatar,
  ErrorText,
  SuccessText,
  ActionGroup
} from '../styles/ContactStyles';


export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const fetchData = async () => {
    try {
      const data = await contactService.getContacts();
      setContacts(data.contacts);
      setPendingRequests(data.pending_requests);
    } catch (err) {
      setStatusMsg({ text: 'Failed to load contacts. Please try again.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatusMsg({ text: '', type: '' });
    try {
      await contactService.sendRequest(email);
      setStatusMsg({ text: 'Contact request sent!', type: 'success' });
      setEmail('');
      fetchData();
    } catch (err) {
      if (err.response?.status === 404) {
        setStatusMsg({ text: 'User is not registered', type: 'error' });
      } else {
        setStatusMsg({ text: err.response?.data?.error || 'Failed to send request', type: 'error' });
      }
    }
  };

  const handleRespond = async (id, status) => {
    setStatusMsg({ text: '', type: '' });
    try {
      if (status === 'rejected') {
        await contactService.removeContact(id);
        setStatusMsg({ text: 'Contact request declined.', type: 'success' });
      } else {
        await contactService.respondToRequest(id, status);
        setStatusMsg({ text: 'Contact request accepted!', type: 'success' });
      }
      fetchData();
    } catch (err) {
      setStatusMsg({ text: err.response?.data?.error || 'Action failed.', type: 'error' });
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this contact?')) return;
    setStatusMsg({ text: '', type: '' });
    try {
      await contactService.removeContact(id);
      setStatusMsg({ text: 'Contact removed.', type: 'success' });
      fetchData();
    } catch (err) {
      setStatusMsg({ text: err.response?.data?.error || 'Failed to remove contact.', type: 'error' });
    }
  };


  return (
    <Container>
      <Header>Contacts</Header>

      {statusMsg.text && (
        <div style={{ marginBottom: '1rem' }}>
          {statusMsg.type === 'error' 
            ? <ErrorText>{statusMsg.text}</ErrorText> 
            : <SuccessText>{statusMsg.text}</SuccessText>
          }
        </div>
      )}

      <Section>
        <SectionTitle>Add a Contact</SectionTitle>
        <form onSubmit={handleSendRequest}>
          <InputGroup>
            <Input 
              type="email" 
              placeholder="Enter user email..." 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button type="submit">Send Request</Button>
          </InputGroup>
        </form>
      </Section>

      {pendingRequests.length > 0 && (
        <Section>
          <SectionTitle>Pending Requests</SectionTitle>
          <ContactList>
            {pendingRequests.map(req => (
              <ContactCard key={req.id}>
                <UserInfo>
                  <Avatar>{req.requester?.name?.charAt(0) || req.requester?.email?.charAt(0) || '?'}</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>{req.requester?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{req.requester?.email}</div>
                  </div>
                </UserInfo>
                <ActionGroup>
                  <Button onClick={() => handleRespond(req.id, 'accepted')}>Accept</Button>
                  <Button variant="secondary" onClick={() => handleRespond(req.id, 'rejected')}>Decline</Button>
                </ActionGroup>
              </ContactCard>
            ))}
          </ContactList>
        </Section>
      )}

      <Section>
        <SectionTitle>My Contacts</SectionTitle>
        {contacts.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>You don't have any contacts yet.</p>
        ) : (
          <ContactList>
            {contacts.map(contact => (
              <ContactCard key={contact.id}>
                <UserInfo>
                  <Avatar>{contact.name?.charAt(0) || contact.email?.charAt(0) || '?'}</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>{contact.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{contact.email}</div>
                  </div>
                </UserInfo>
                <Button variant="secondary" onClick={() => handleRemove(contact.id)}>Remove</Button>
              </ContactCard>
            ))}
          </ContactList>
        )}
      </Section>
    </Container>
  );
}
