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

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;

  option {
    color: #333;
    font-size: 16px;
    padding: 10px;
  }
`;


const Button = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  width: 100%;
  background: linear-gradient(135deg, #8e24aa, #3949ab); /* Purple to blue */
  color: white;
  border: none;
  border-radius: 10px; /* Rounded edges */
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */

  &:hover {
    background: linear-gradient(135deg, #7b1fa2, #303f9f); /* Darker on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
    transform: translateY(-2px); /* Lift effect */
  }
`;

export default function Register() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:2005/register', data);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <Input placeholder="Username" {...register('username')} required />
            <Input placeholder="Password" type="password" {...register('password')} required />
            <Input placeholder="Age" type="number" {...register('age')} />
            <Select {...register('gender')}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </Select>

            <Input placeholder="Location" {...register('location')} />
            <Button type="submit">Register</Button>
        </Form>
    );
}
