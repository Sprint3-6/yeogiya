import axios from 'axios';
import { refreshToken } from '../authApi';
import { BASE_URL } from '../constants/url';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청을 보내기 직전 실행되는 옵션
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 서버에서 응답을 받은 직후 실행되는 옵션
instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (localStorage.getItem('refreshToken')) await refreshToken();

      error.config.headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      console.log(error.config);
      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);

export default instance;
