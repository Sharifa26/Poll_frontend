import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from '@emotion/styled';

const Form = styled.form`
  margin: 50px auto;
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
  }
`;

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:2005/login', data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <Input placeholder="Username" {...register('username')} required />
      <Input placeholder="Password" type="password" {...register('password')} required />
      <Button type="submit">Login</Button>
    </Form>
  );
}
