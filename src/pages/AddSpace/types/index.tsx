import { InputHTMLAttributes } from 'react';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface PlaceInputValue {
  title: string;
  description: string;
  price: string;
  address: string;
  image: File[];
}

export interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<PlaceInputValue>;
}

export interface DescriptionInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<PlaceInputValue>;
}

export interface PriceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<PlaceInputValue>;
}

export interface KakaoPostSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<PlaceInputValue>;
  setValue: UseFormSetValue<PlaceInputValue>;
  error: boolean;
  getValues: UseFormGetValues<PlaceInputValue>;
}

export interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  images: File[];
  setImages: (value: File[]) => void;
  id: string;
  maxImageCount?: number;
  isSubmitted?: boolean;
}
