// pages/index.js 
import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  margin: 0;
  overflow: hidden; /* Prevent scrolling */
  text-align: center;
  padding: 20px; /* Add padding for smaller screens */

  @media (max-width: 768px) { /* Mobile view adjustments */
    height: auto; /* Allow auto height for scrolling */
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 4rem; /* Default size */
  font-weight: bold;
  color: black; /* Black for contrast */
  margin-bottom: 20px;

  @media (max-width: 768px) { /* Mobile view */
    font-size: 2.5rem; /* Reduce size */
    margin-bottom: 15px;
  }
`;

const Description = styled.p`
  font-size: 2rem; /* Default size */
  font-weight: bold;
  color: black; /* Black for contrast */
  margin-bottom: 50px; /* Space between description and buttons */

  @media (max-width: 768px) { /* Mobile view */
    font-size: 1.5rem; /* Reduce size */
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px; /* Space between buttons */

  @media (max-width: 768px) { /* Mobile view */
    flex-direction: column; /* Stack buttons vertically */
    gap: 15px; /* Reduce gap */
  }
`;

const Button = styled.button`
  padding: 20px 50px; /* Default padding */
  font-size: 1.8rem; /* Default font size */
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

  @media (max-width: 768px) { /* Mobile view */
    padding: 15px 30px; /* Adjust padding */
    font-size: 1.5rem; /* Reduce font size */
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Welcome to the Poll Fun🎯</Title>
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
