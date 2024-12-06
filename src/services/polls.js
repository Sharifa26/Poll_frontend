import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2005';

export const fetchPolls = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/polls`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPoll = async (pollData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/polls`, pollData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
