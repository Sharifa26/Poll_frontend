// components/navbar.js
import Link from 'next/link';
import styled from '@emotion/styled';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: #8e24aa;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
      color: #ffccff;
    }
  }
`;

export default function NavBar() {
  return (
    <NavBarContainer>
      <Logo>🎯 Poll Fun</Logo>
      <NavLinks>
        <Link href="/home">Home</Link>
        <Link href="/polls">Polls</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/logout">Logout</Link>
      </NavLinks>
    </NavBarContainer>
  );
}
