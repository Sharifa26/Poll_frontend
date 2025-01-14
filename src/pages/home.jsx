// pages/home.js
import styled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from '../components/Navbar';
import dotenv from 'dotenv';
dotenv.config();


const HomeContainer = styled.div`
  text-align: center;
  padding: 20px; /* Reduced padding for smaller screens */

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Reduced font size for mobile */
  color: #4a148c;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FactContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const FactCard = styled.div`
  width: 300px;
  padding: 15px; /* Adjust padding for mobile */
  background: #f3e5f5;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1rem; /* Adjust font size for mobile */

  @media (max-width: 768px) {
    width: 90%; /* Make cards take up most of the screen width */
  }
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px; /* Adjust padding for mobile */
  font-size: 1rem; /* Adjust font size for mobile */
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 20px; /* Adjust padding for mobile */
  border-radius: 10px;
  width: 90%; /* Make modal fit within screen width */
  max-width: 400px; /* Keep max width for larger screens */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem; /* Adjust font size for mobile */
  color: #4a148c;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%; /* Ensure full width on mobile */
  margin-bottom: 10px;
  padding: 8px; /* Adjust padding for mobile */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9rem; /* Adjust font size for mobile */
`;

const AddOptionButton = styled.button`
  margin: 8px 0;
  padding: 6px 10px; /* Adjust padding for mobile */
  background: #8e24aa;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem; /* Adjust font size for mobile */
  cursor: pointer;

  &:hover {
    background: #6a1b9a;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column; /* Stack buttons vertically on mobile */
  gap: 10px; /* Add spacing between buttons */

  @media (min-width: 768px) {
    flex-direction: row; /* Keep buttons side-by-side on larger screens */
    justify-content: space-between;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #8e24aa;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem; /* Adjust font size for mobile */
  cursor: pointer;

  &:hover {
    background: #6a1b9a;
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


const CancelButton = styled.button`
  padding: 10px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem; /* Adjust font size for mobile */
  cursor: pointer;

  &:hover {
    background: #b71c1c;
  }
`;



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // Minimum 2 options
  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value; // Update specific option
    setOptions(newOptions);
  };


  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Validate question and options
      if (!question || options.filter((opt) => opt.trim()).length < 2) {
        alert('Please provide a question and at least two options.');
        return;
      }

      // Build payload using `text`
      const payload = {
        question,
        options: options
          .filter((opt) => opt.trim()) // Remove empty options
          .map((opt) => ({ text: opt.trim() })), // Map to correct format
      };


      // Send API request
      await axios.post(`${API_BASE_URL}v2/polls`, payload, {
        headers: { Authorization: token },
      });

      alert('Poll created successfully!');
      setShowModal(false);
      router.push('/polls'); // Redirect to Polls page
    } catch (error) {
      console.error('Error creating poll:', error.response || error.message);
      alert('Failed to create poll. Please try again.');
    }
  };

  // Close modal function
  const handleCancel = () => {
    setShowModal(false); // Close the modal
  };

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
          <FactCard>🧠 Polls help researchers understand human behavior and societal trends.</FactCard>
          <FactCard>💡 Polls can be used to inform political campaigns and public policy.</FactCard>
          <FactCard>🌐 Global polls provide insights into cross-cultural values and beliefs.</FactCard>
          <FactCard>📞 Telephone polling was the most popular method before the internet revolution.</FactCard>
          <FactCard>🎮 Gamified polls increase participation rates by up to 50%.</FactCard>
          <FactCard>🧩 Short polls (1-3 questions) have 70% higher completion rates.</FactCard>
        </FactContainer>

        {/* Create Poll Button */}
        <CreateButton onClick={() => setShowModal(true)}><strong>+ Create Poll</strong></CreateButton>

        {/* Modal for Creating Poll */}
        {showModal && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>Create a Poll</ModalTitle>
              <Input
                type="text"
                placeholder="Enter poll question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {options.map((option, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
              <AddOptionButton onClick={handleAddOption}><strong>+ Add Option</strong></AddOptionButton>

              {/* Button Row */}
              <ButtonRow>
                <CancelButton onClick={handleCancel}><strong>Cancel</strong></CancelButton>
                <SubmitButton onClick={handleSubmit}><strong>Create Poll</strong></SubmitButton>
              </ButtonRow>
            </ModalBox>
          </ModalOverlay>
        )}
      </HomeContainer>
    </>
  );
}
