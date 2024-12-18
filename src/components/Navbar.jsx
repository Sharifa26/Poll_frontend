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
  width: 400px;
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
        <NavLinks>
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
