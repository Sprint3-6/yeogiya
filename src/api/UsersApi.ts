import axios from 'axios';
import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';
import { ErrorType } from './types/axiosErrorType';
import toast from '@/utils/toast';
import { InputValue } from '@/components/UserForm/types';
import { myInfoValue } from '@/pages/MyPage/types';

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
    const responseError = error as ErrorType;
    toast.error(responseError.response.data.message);
    console.log('회원가입 실패', error);
  }
};

// 내 정보 조회 api
export const myInfoGetApi = async () => {
  try {
    const response = await instance.get(`${BASE_URL}users/me`);
    console.log('내정보 조회 api', response);
    return response.data;
  } catch (error) {
    console.log('내 정보 조회 실패', error);
  }
};

// 내 정보 수정
export const myInfoEditApi = async (value: myInfoValue) => {
  console.log('수정값', value.profileImageUrl);
  try {
    const response = await instance.patch(`${BASE_URL}users/me`, {
      nickname: value.nickname,
      profileImageUrl: value.profileImageUrl,
      newPassword: value.password,
    });
    console.log('내 정보 수정 api', response);
    return response;
  } catch (error) {
    const responseError = error as ErrorType;
    console.log('내 정보 수정 실패', error);
    toast.error(responseError.response.data.message);
  }
};

// 프로필 이미지 url 생성
export const createProfileImageUrl = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    console.log('이미지 파일 api', imageFile);

    const response = await instance.post(`${BASE_URL}users/me/image`, formData);
    console.log('프로필 이미지 업로드 성공', imageFile);

    return response.data;
  } catch (error) {
    console.log('프로필 이미지 업로드 오류', error);
  }
};
