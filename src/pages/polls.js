// pages/polls.js
import styled from '@emotion/styled';
import NavBar from '../components/Navbar';

const PollsContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const PollCard = styled.div`
  background: ${(props) => props.bgColor || '#e3f2fd'};
  padding: 30px;
  margin: 20px auto;
  width: 80%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const polls = [
  { id: 1, question: "What's your favorite color?", votes: 120 },
  { id: 2, question: 'Best programming language?', votes: 98 },
  { id: 3, question: 'Favorite season?', votes: 75 },
];

export default function Polls() {
  const colors = ['#e3f2fd', '#f3e5f5', '#ede7f6', '#e8f5e9'];

  return (
    <>
      <NavBar />
      <PollsContainer>
        <Title>Available Polls</Title>
        {polls.map((poll, index) => (
          <PollCard key={poll.id} bgColor={colors[index % colors.length]}>
            <h3>{poll.question}</h3>
            <p>Votes: {poll.votes}</p>
          </PollCard>
        ))}
      </PollsContainer>
    </>
  );
}
