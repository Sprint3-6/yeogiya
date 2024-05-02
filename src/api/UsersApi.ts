import axios from 'axios';
import { BASE_URL } from './constants/url';
import { InputValue } from '@/components/UserForm';
import instance from './instance/defaultInstance';

// 회원가입 api
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
    console.log('회원가입 실패', error);
  }
};

// 내 정보 조회 api
export const myinfoGetApi = async () => {
  try {
    const response = await instance.get(`${BASE_URL}users/me`);
    console.log('내정보 조회 api', response);
    return response.data;
  } catch (error) {
    console.log('내 정보 조회 실패', error);
  }
};
