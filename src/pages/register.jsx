// pages/register.js
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from '@emotion/styled';
import Link from 'next/link';
import dotenv from 'dotenv';
dotenv.config();



const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background: #d8bfd8; /* Light purple for the card */
  padding: 40px;
  border-radius: 20px; /* Rounded corners for card shape */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333; /* Darker text for readability */
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px -6px;
  padding: 10px;
  width: 100%;
  border: 1px solid #9370DB; /* purple border for inputs */
  border-radius: 10px; /* Rounded edges */
  background-color: #ffffff; /* White input field */
  font-size: 1rem;
`;

const Select = styled.select`
  margin: 10px -6px;
  padding: 10px;
  width: 105%;
  border: 1px solid #9370DB; /* purple border for select */
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 1rem;

  option {
    font-size: 1rem;
    color: #333;
  }
`;

const Button = styled.button`
  margin: 20px -6px;
  padding: 10px 20px;
  width: 105%;
  background: linear-gradient(135deg, #8e24aa, #3949ab); /* Purple to blue */
  color: white;
  border: none;
  border-radius: 10px; /* Rounded edges */
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  font-size: 1.3rem;


  &:hover {
    background: linear-gradient(135deg, #7b1fa2, #303f9f); /* Darker on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
    transform: translateY(-2px); /* Lift effect */
  }
`;

// Add this styled component for the message
const CornerMessage = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333; /* Dark gray for readability */
  text-align: center;

  a {
    color: #3949ab; /* purple color for links */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #8e24aa; /* purple color on hover */
    }
  }
`;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}v2/register`, data,{withCredentials: true, });
      alert(response.data.message);
      window.location.href = '/login';
    } catch (error) {
      // Check if error.response is available and has the required data
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert('Registration failed: ' + errorMessage);
    }
  };


  return (
    <PageContainer>
      <FormContainer>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Username" {...register('username')} required />
          <Input placeholder="Password" type="password" {...register('password')} required />
          <Input placeholder="Age" type="number" {...register('age')} required />
          <Select {...register('gender')} required >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input placeholder="Location" {...register('location')} required />
          <Button type="submit">Register</Button>
        </Form>
        {/* Add the login message here */}
        <CornerMessage>
          Already registered? <Link href="/login" passHref>Login here</Link>
        </CornerMessage>
      </FormContainer>
    </PageContainer>
  );
}
