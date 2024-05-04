import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError } from 'axios';
import { AxiosArgs, AxiosQueryError } from '../types/axiosBase';
import instance from './defaultInstance';

// baseUrl을 받아서 axios 요청을 보내는 함수를 반환합니다.
export function axiosBaseQuery(
  { baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<string | AxiosArgs, unknown, AxiosQueryError> {
  return async (args) => {
    if (typeof args === 'string') {
      args = { url: args };
    }
    const { url, body: data, headers = {}, ...config } = args ?? {};

    // headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

    // Axios 인스턴스를 사용하여 HTTP 요청을 수행합니다. 주어진 URL에 baseURL 추가하고, 데이터와 헤더를 포함하여 요청을 보냅니다.
    try {
      const response = await instance.request({
        ...config,
        url: baseUrl + url,
        data,
        headers,
      });
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      const { message, response } = axiosError;
      return {
        error: {
          cause: axiosError,
          message,
          response,
        } as AxiosQueryError,
      };
    }
  };
}

export default axiosBaseQuery;
