import styled from '@emotion/styled';
import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImage from '../components/ProfileImage';
require('dotenv').config();


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
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;

  h3 {
    font-size: 1rem;
    color: #333;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  input, select {
    width: 70%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .save {
    background: #8e24aa;
    color: white;
  }

  .cancel {
    background: #ccc;
    color: #333;
  }
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [createdPolls, setCreatedPolls] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('User is not logged in.');

        const userResponse = await axios.get(`${API_BASE_URL}v2/user`, {
          withCredentials: true,
          headers: { Authorization: token },
        });

        setUser(userResponse.data);
        setFormData({
          username: userResponse.data.polls.username || '',
          age: userResponse.data.polls.age || '',
          gender: userResponse.data.polls.gender || '',
          location: userResponse.data.polls.location || '',
        });

        const pollsResponse = await axios.get(`${API_BASE_URL}v2/polls/user`, {
          withCredentials: true,
          headers: { Authorization: token },
        });
        setCreatedPolls(pollsResponse.data.polls);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        alert('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated user data
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `${API_BASE_URL}v2/user/${user.polls._id}`,
        formData,
        { headers: { Authorization: token } }
      );

      alert('Profile updated successfully!');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Failed to update profile.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <LeftSection>
          <Title>Profile</Title>
          <ProfileImage gender={user.polls.gender} />
          {isEditing ? (
            <>
              <FormField>
                <label>Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </FormField>
              <FormField>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                />
              </FormField>
              <FormField>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FormField>
              <FormField>
                <label>Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
              </FormField>
              <ButtonGroup>
                <button className="save" onClick={handleSave}>Save</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <ProfileDetail>Username: <strong>{user.polls.username}</strong></ProfileDetail>
              <ProfileDetail>Gender: <strong>{user.polls.gender}</strong></ProfileDetail>
              <ProfileDetail>Age: <strong>{user.polls.age}</strong></ProfileDetail>
              <ProfileDetail>Location: <strong>{user.polls.location}</strong></ProfileDetail>
              <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
            </>
          )}
        </LeftSection>

        {/* Right Section - Created Polls */}
        <RightSection>
          <Title>Created Polls</Title>
          {createdPolls.length > 0 ? (
            createdPolls.map((poll) => (
              <PollItem key={poll._id}>
                <h3>{poll.question}</h3>
              </PollItem>
            ))
          ) : (
            <p>You have not created any polls yet.</p>
          )}
        </RightSection>
      </ProfileContainer>
    </>
  );
}
