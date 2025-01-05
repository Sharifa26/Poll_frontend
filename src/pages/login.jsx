// pages/login.js
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
  padding: 20px; /* Added padding for smaller screens */
`;

const FormContainer = styled.div`
  background: #d8bfd8;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
    max-width: 100%; /* Use full width on mobile */
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #9370db;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  width: 100%;
  background: linear-gradient(135deg, #8e24aa, #3949ab);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.3rem;

  &:hover {
    background: linear-gradient(135deg, #7b1fa2, #303f9f);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }
`;

const CornerMessage = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
  text-align: center;

  a {
    color: #3949ab;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #8e24aa;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}v2/login`, data, {
        withCredentials: true,
      });
      const token = response.data.token;

      // Store the token in session storage
      localStorage.setItem('authToken', token);

      alert(response.data.message);
      window.location.href = '/home';
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert('Login failed: ' + errorMessage);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Username" {...register('username')} required />
          <Input placeholder="Password" type="password" {...register('password')} required />
          <Button type="submit">Login</Button>
        </Form>
        <CornerMessage>
          Don&apos;t have an account? <Link href="/register" passHref>Register here</Link>
        </CornerMessage>
      </FormContainer>
    </PageContainer>
  );
}
