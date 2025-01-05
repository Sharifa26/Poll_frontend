// pages/logout.js
import styled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from '../components/Navbar';
import dotenv from 'dotenv';
dotenv.config();

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

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 15px;
  }
`;

const ModalTitle = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CancelButton = styled(ConfirmButton)`
  background: #d32f2f;

  &:hover {
    background: #b71c1c;
  }
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}v2/logout`, {}, { withCredentials: true });

      // Clear localStorage if needed
      localStorage.removeItem('authToken');

      alert('Logged out successfully!');
      setShowLogoutModal(false);
      router.push('/index');
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
      <NavBar onLogoutClick={() => setShowLogoutModal(true)} />

      {/* Logout Confirmation Modal */}
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
