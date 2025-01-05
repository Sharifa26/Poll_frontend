// components/NavbarWithLogout.js
import Link from 'next/link';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: #8e24aa;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  right: 10px;
  background: #8e24aa;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 10;

  @media (min-width: 769px) {
    display: flex;
    position: static;
    padding: 0;
    background: none;
    box-shadow: none;
    flex-direction: row;
    gap: 20px; /* Adds spacing between links */
  }

  a {
    display: block;
    padding: 10px 20px;
    margin: 5px 0;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s ease, color 0.3s ease;

    @media (min-width: 769px) {
      margin: 0;
      padding: 0;
      font-size: 1.2rem;
    }

    &:hover {
      background: #7b1fa2;
      color: #ffccff;
    }
  }
`;


const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: 45%;
  padding: 10px;
  background: #8e24aa;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background: #6a1b9a;
  }
`;

const CancelButton = styled.button`
  width: 45%;
  padding: 10px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background: #b71c1c;
  }
`;

export default function NavBarWithLogout() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      alert('Logged out successfully!');
      setShowLogoutModal(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error.response || error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <NavBarContainer>
        <Logo>🎯 Poll Fun</Logo>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✖' : '☰'}
        </MenuButton>
        <NavLinks isOpen={menuOpen}>
          <Link href="/home">Home</Link>
          <Link href="/polls">Polls</Link>
          <Link href="/profile">Profile</Link>
          <a href="#" onClick={() => setShowLogoutModal(true)}>Logout</a>
        </NavLinks>
      </NavBarContainer>

      {showLogoutModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Are you sure you want to logout?</ModalTitle>
            <ButtonRow>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              <ConfirmButton onClick={handleLogout}>Logout</ConfirmButton>
            </ButtonRow>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}
