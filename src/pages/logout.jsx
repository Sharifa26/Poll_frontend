import styled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from '../components/Navbar';
require('dotenv').config();


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
      setShowLogoutModal(false); // Close modal
      router.push('/index'); // Redirect to home page
    } catch (error) {
      console.error('Logout failed:', error.response || error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  // Cancel Logout
  const handleCancel = () => {
    setShowLogoutModal(false); // Close the modal
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
