import { useState, useEffect, useRef } from 'react';
import { auth, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { userService } from '../services/api';
import styled from 'styled-components';
import { 
  MainContainer, 
  AuthCard, 
  FormGroup, 
  StyledInput, 
  PrimaryButton,
  ErrorMessage
} from '../styles/AuthStyles';

const ProfileCard = styled(AuthCard)`
  max-width: 500px;
`;

const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const AvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--surface);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const AvatarPlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-muted);
  border: 4px solid var(--surface);
  box-shadow: var(--shadow-md);
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SuccessMessage = styled.div`
  color: #059669;
  background: #ecfdf5;
  padding: 0.75rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userService.getUserProfile();
      setUser(data.user);
      setName(data.user.name || '');
      setAvatarUrl(data.user.avatar_url || '');
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      setAvatarUrl(downloadURL);
      // Automatically update backend with new URL
      await userService.updateUserProfile({ avatar_url: downloadURL });
      setSuccess('Profile image updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to upload image');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      setError('');
      await userService.updateUserProfile({ name, avatar_url: avatarUrl });
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <p>Loading profile...</p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <ProfileCard>
        <h2>Your Profile</h2>
        <p>Manage your account settings</p>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <AvatarUpload>
          <HiddenInput 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*"
          />
          {avatarUrl ? (
            <AvatarPreview 
              src={avatarUrl} 
              alt="Profile" 
              onClick={handleAvatarClick}
              title="Click to change"
            />
          ) : (
            <AvatarPlaceholder onClick={handleAvatarClick}>
              {name?.charAt(0) || user?.email?.charAt(0) || '?'}
            </AvatarPlaceholder>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Click image to upload new photo
          </span>
        </AvatarUpload>

        <form onSubmit={handleUpdate}>
          <FormGroup>
            <label htmlFor="email">Email Address</label>
            <StyledInput 
              id="email"
              type="email" 
              value={user?.email || ''} 
              disabled 
              style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="name">Full Name</label>
            <StyledInput 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

          <PrimaryButton type="submit" disabled={updating}>
            {updating ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </form>
      </ProfileCard>
    </MainContainer>
  );
}
