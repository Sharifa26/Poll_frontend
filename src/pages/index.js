import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full-screen height */
  margin: 0; /* No margin */
  overflow: hidden; /* Prevent scrolling */
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem; /* Larger font size */
  font-weight: bold;
  color: #e0f7fa; /* Light cyan for contrast */
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 2rem; /* Larger font size for description */
  font-weight: bold;
  color: #d1c4e9; /* Soft lavender */
  margin-bottom: 50px; /* Space between description and buttons */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px; /* Space between buttons */
`;

const Button = styled.button`
  padding: 20px 50px; /* Bigger padding for prominent buttons */
  font-size: 1.8rem; /* Bigger font for buttons */
  background: linear-gradient(135deg, #8e24aa, #3949ab); /* Purple to blue */
  color: white;
  border: none;
  border-radius: 10px; /* Rounded edges */
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */

  &:hover {
    background: linear-gradient(135deg, #7b1fa2, #303f9f); /* Darker on hover */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
    transform: translateY(-2px); /* Lift effect */
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Welcome to the Poll System</Title>
      <Description>Create, vote, and view polls dynamically!</Description>
      <ButtonContainer>
        <Link href="/register" passHref>
          <Button>Register</Button>
        </Link>
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
}
