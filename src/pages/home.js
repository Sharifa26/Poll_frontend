// pages/home.js
import styled from '@emotion/styled';
import NavBar from '../components/Navbar';

const HomeContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #4a148c;
  margin-bottom: 30px;
`;

const FactContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const FactCard = styled.div`
  width: 300px;
  padding: 20px;
  background: #f3e5f5;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
`;

export default function Home() {
  return (
    <>
      <NavBar />
      <HomeContainer>
        <Title>Interesting Facts About Polls</Title>
        <FactContainer>
          <FactCard>🤔 The first modern public opinion poll was conducted in 1936.</FactCard>
          <FactCard>🎉 Over 60% of people participate in polls just for fun!</FactCard>
          <FactCard>📊 Polls can predict elections with surprising accuracy!</FactCard>
          <FactCard>🌍 Polls help gauge opinions worldwide in real time.</FactCard>
        </FactContainer>
      </HomeContainer>
    </>
  );
}
