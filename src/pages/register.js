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
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
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
