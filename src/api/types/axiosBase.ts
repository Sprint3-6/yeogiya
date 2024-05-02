import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
}

export interface AxiosQueryError extends SerializedError {
  cause: AxiosError;
  response: AxiosResponse;
}
