import { InputHTMLAttributes } from 'react';

export interface LoginItem extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  id: string;
  type: string;
  text?: string;
}

export interface InputValue {
  email?: string;
  nickname?: string;
  password?: string;
  passwordCheck?: string;
}

export interface LoginFormProps {
  value: InputValue;
  onClickForm: (value: InputValue) => void;
  children: React.ReactNode;
}

export interface LoginContextProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleError: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickForm: () => void;
  isValid: boolean;
  inputValue: InputValue;
  error: InputValue;
}

export interface errorCheck {
  email: boolean;
  nickname: boolean;
  password: boolean;
  passwordCheck: boolean;
  [key: string]: boolean;
}

export interface errorMessage {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  [key: string]: string;
}
