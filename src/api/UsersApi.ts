import axios from 'axios';
import { BASE_URL } from './constants/url';
import { InputValue } from '@/components/UserForm';

export const signUpApi = async (value: InputValue) => {
  try {
    const response = await axios.post(
      `${BASE_URL}users`,
      {
        email: value.email,
        nickname: value.nickname,
        password: value.password,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
