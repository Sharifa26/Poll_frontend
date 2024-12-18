import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';

const PollsContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const PollRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const PollCard = styled.div`
  background: ${(props) => props.bgColor || '#e3f2fd'};
  padding: 20px;
  width: 45%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
`;

const TotalVotes = styled.div`
  font-weight: bold;
  color: black;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const PollQuestion = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const OptionButton = styled.button`
  background-color: #03a9f4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 5px 0;
  width: 100%;
  text-align: left;
  display: flex;  /* Enable flexbox */
  justify-content: space-between; /* This will push content to the left and right */
  align-items: center; /* Vertically center the content */

  &:hover {
    background-color: #0288d1;
  }
`;

const OptionVotes = styled.span`
  color: black;
  font-weight: bold;
  margin-left: 10px; /* Optional, to create space between the option text and vote count */

`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const colors = ['#e3f2fd', '#f3e5f5', '#ede7f6', '#e8f5e9'];

  // Fetch polls function
  const fetchPolls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}v2/polls`, { withCredentials: true });
      if (response.data.success) {
        setPolls(response.data.polls); // Update the state with fetched polls
      } else {
        console.error('Error fetching polls:', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      console.error('Error fetching polls:', errorMessage);
    }
  };

  useEffect(() => {
    fetchPolls(); // Initial fetch on component mount
  }, []);

  // Handle voting
  const vote = async (pollId, optionIndex) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User is not logged in.');

      const response = await axios.put(
        `${API_BASE_URL}v2/polls/vote/${pollId}`,
        { optionIndex },
        {
          headers: { Authorization: token },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert('Vote cast successfully!');
        fetchPolls(); // Refresh polls after voting
      } else {
        alert('Error voting: ' + response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert('Error voting: ' + errorMessage);
    }
  };

  // Group polls into rows (2 polls per row)
  const groupedPolls = [];
  for (let i = 0; i < polls.length; i += 2) {
    groupedPolls.push(polls.slice(i, i + 2));
  }

  return (
    <>
      <NavBar />
      <PollsContainer>
        <Title>Available Polls</Title>
        {groupedPolls.map((row, rowIndex) => (
          <PollRow key={rowIndex}>
            {row.map((poll, index) => (
              <PollCard key={poll._id} bgColor={colors[(rowIndex * 2 + index) % colors.length]}>
                <TotalVotes>Total Votes: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}</TotalVotes>
                <PollQuestion>{poll.question}</PollQuestion>
                {poll.options.map((option, optionIndex) => (
                  <OptionButton
                    key={option._id}
                    onClick={() => vote(poll._id, optionIndex)} // Vote function
                  >
                    {option.text}
                    <OptionVotes>{option.votes}</OptionVotes>
                  </OptionButton>
                ))}
              </PollCard>
            ))}
          </PollRow>
        ))}
      </PollsContainer>
    </>
  );
}
