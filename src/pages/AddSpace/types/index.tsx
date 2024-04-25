import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface PlaceInputValue {
  title: string;
  description: string;
  price: string;
  address: string;
  image: File[];
}

export interface TitleInputProps {
  register: UseFormRegister<PlaceInputValue>;
}

export interface DescriptionInputProps {
  register: UseFormRegister<PlaceInputValue>;
}

export interface PriceInputProps {
  register: UseFormRegister<PlaceInputValue>;
}

export interface KakaoPostSearchProps {
  register: UseFormRegister<PlaceInputValue>;
  setValue: UseFormSetValue<PlaceInputValue>;
  error: boolean;
  getValues: UseFormGetValues<PlaceInputValue>;
}

export interface ImageUploaderProps {
  images: File[];
  setImages: (value: File[]) => void;
  id: string;
  maxImageCount?: number;
  isSubmitted?: boolean;
}
