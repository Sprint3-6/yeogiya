import instance from './instance/defaultInstance';
import { CreateActivityBody } from './types/myActivities';

export const uploadImage = async (imageFile: File) => {
  try {
    // 이미지 파일을 FormData 객체에 추가
    const formData = new FormData();
    formData.append('image', imageFile);

    // Axios를 사용하여 POST 요청 전송
    const response = await instance.post('activities/image', formData);

    return response.data.activityImageUrl;
  } catch (error) {
    // 오류 처리
    console.error('이미지 업로드 오류:', error);
  }
};

export const postData = async (body: CreateActivityBody) => {
  await instance.post('activities', body);
};
