//pages/poll.js
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import dotenv from 'dotenv';
dotenv.config();

const PollsContainer = styled.div`
  padding: 20px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const PollRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PollCard = styled.div`
  background: ${(props) => props.bgColor || '#e3f2fd'};
  padding: 20px;
  width: 45%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const TotalVotes = styled.div`
  font-weight: bold;
  color: black;
  font-size: 1rem;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const PollQuestion = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const OptionButton = styled.button`
  background-color: #03a9f4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 5px 0;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #0288d1;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 1rem;
  }
`;

const OptionVotes = styled.span`
  color: black;
  font-weight: bold;
  margin-left: 10px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const colors = ['#e3f2fd', '#f3e5f5', '#ede7f6', '#e8f5e9'];

  const fetchPolls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}v2/polls`, { withCredentials: true });
      if (response.data.success) {
        setPolls(response.data.polls);
      } else {
        console.error('Error fetching polls:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching polls:', error.message || 'Unknown error');
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const vote = async (pollId, optionIndex) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('User is not logged in.');
      }
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
        fetchPolls();
      } else {
        alert(`Error voting: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error voting:', error.message || 'Unknown error');
      alert(`Error voting: ${error.message || 'Unknown error'}`);
    }
  };

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
              <PollCard
                key={poll._id}
                bgColor={colors[(rowIndex * 2 + index) % colors.length]}
              >
                <TotalVotes>
                  Total Votes: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}
                </TotalVotes>
                <PollQuestion>{poll.question}</PollQuestion>
                {poll.options.map((option, optionIndex) => (
                  <OptionButton
                    key={option._id}
                    onClick={() => vote(poll._id, optionIndex)}
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
