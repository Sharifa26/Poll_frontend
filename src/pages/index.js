import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;
  color: black;
  padding: 50px;
`;

const Button = styled.button`
  margin: 20px;
  padding: 15px 30px;
  font-size: 18px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default function Home() {
  return (
    <Container>
      <h1>Welcome to the Poll System</h1>
      <p>Create, vote, and view polls dynamically!</p>
      <Link href="/register">
        <Button>Register</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </Container>
  );
}
