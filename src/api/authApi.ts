import axios from 'axios';
import { TokenResponse } from './types/auth';
import { BASE_URL } from './constants/url';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}3-6/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    // 성공적으로 로그인했을 때의 처리
    console.log('로그인 성공:', response.data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    // 반환된 토큰 정보 등을 저장하거나 처리할 수 있음
  } catch (error) {
    // 로그인 실패 시 처리
    console.error('로그인 실패:', error);
  }
};

export const refreshToken = async (): Promise<TokenResponse> => {
  try {
    // 로컬 스토리지에서 리프레쉬 토큰을 가져옵니다.
    const refreshToken = localStorage.getItem('refreshToken');

    // 만약 리프레쉬 토큰이 없다면 에러를 throw합니다.
    if (!refreshToken) {
      throw new Error('액세스 토큰이 없습니다.');
    }

    const response = await axios.post<TokenResponse>(`${BASE_URL}auth/tokens`, null, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`, // 로컬 스토리지에서 가져온 리프레쉬 토큰을 사용합니다.
      },
    });

    // 성공적으로 토큰을 받았을 때의 처리
    console.log('토큰 정보 재발급 성공');

    // 받은 토큰 정보를 로컬 스토리지에 저장합니다.
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  } catch (error) {
    // 에러 발생 시 처리
    console.error('토큰 요청 오류:', error);
    throw error; // 호출한 곳으로 에러를 전파합니다.
  }
};
