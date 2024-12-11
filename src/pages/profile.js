// pages/profile.js
import styled from '@emotion/styled';
import NavBar from '../components/Navbar';

const ProfileContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const ProfileCard = styled.div`
  background: #f3e5f5;
  padding: 40px;
  margin: 0 auto;
  width: 60%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #4a148c;
  margin-bottom: 30px;
`;

const ProfileDetail = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  background: #8e24aa;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #6a1b9a;
  }
`;

export default function Profile() {
  const user = {
    username: 'JohnDoe',
    age: 25,
    gender: 'Male',
    location: 'New York',
  };

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <Title>User Profile</Title>
        <ProfileCard>
          <ProfileDetail>Username: {user.username}</ProfileDetail>
          <ProfileDetail>Age: {user.age}</ProfileDetail>
          <ProfileDetail>Gender: {user.gender}</ProfileDetail>
          <ProfileDetail>Location: {user.location}</ProfileDetail>
          <EditButton>Edit Profile</EditButton>
        </ProfileCard>
      </ProfileContainer>
    </>
  );
}
