import styled from '@emotion/styled';
import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImage from '../components/ProfileImage';


const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  background: #f7f7f7;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  background: #f3e5f5;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const RightSection = styled.div`
  flex: 1.5;
  background: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #4a148c;
  margin-bottom: 30px;
`;

const ProfileDetail = styled.p`
  font-size: 1.2rem;
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

const PollItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;

  h3 {
    font-size: 1.5rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);

  // Fetch user profile and polls
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User is not logged in.');
        }

        // Fetch user data
        const userResponse = await axios.get(
          `${API_BASE_URL}v2/user`,
          {
            withCredentials: true,
            headers: {
              Authorization: token,
            },
          }
        );
        
        setUser(userResponse.data);

        // Fetch user polls
        const pollsResponse = await axios.get(
          `${API_BASE_URL}v2/polls/user`,
          {
            withCredentials: true,
            headers: {
              Authorization: token,
            },
          }
        );
        setPolls(pollsResponse.data.polls);
      } catch (error) {
        // Handle errors
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching user data.';
        console.error('Error fetching user data:', errorMessage);
        alert(errorMessage); // Optionally alert the user
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <ProfileContainer>
        {/* Left Section - User Profile */}
        <LeftSection>
          <Title>Profile</Title>
          <ProfileImage gender={user.polls.gender} />
          <ProfileDetail>Username: {user.polls.username}</ProfileDetail>
          <ProfileDetail>Gender: {user.polls.gender}</ProfileDetail>
          <ProfileDetail>Age: {user.polls.age}</ProfileDetail>
          <ProfileDetail>Location: {user.polls.location}</ProfileDetail>
          <EditButton>Edit Profile</EditButton>
        </LeftSection>

        {/* Right Section - User Polls */}
        <RightSection>
          <Title>Voted Polls</Title>
          {polls.length > 0 ? (
            polls.map((poll) => (
              <PollItem key={poll.id}>
                <h3>{poll.question}</h3>
                <p>Selected Option: {poll.selectedOption}</p>
              </PollItem>
            ))
          ) : (
            <p>You have not voted in any polls yet.</p>
          )}
        </RightSection>
      </ProfileContainer>
    </>
  );
}
