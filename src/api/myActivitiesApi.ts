import instance from './instance/defaultInstance';
import { CreateActivityBody, EditActivityBody, MyActivitiesList } from './types/myActivities';

export const uploadImage = async (imageFile: File) => {
  try {
    // 이미지 파일을 FormData 객체에 추가
    const formData = new FormData();
    formData.append('image', imageFile);

    // Axios를 사용하여 POST 요청 전송
    const response = await instance.post('activities/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.activityImageUrl;
  } catch (error) {
    // 오류 처리
    console.error('이미지 업로드 오류:', error);
  }
};

export const postData = async (body: CreateActivityBody) => {
  try {
    const response = await instance.post('activities', body);
    console.log(response.data); // 성공한 경우 응답 데이터 출력
  } catch (error) {
    console.error('내 체험 등록 오류:', error);
  }
};

export const uploadImageAndPostData = async (body: CreateActivityBody, imageFiles: File[]) => {
  try {
    const imageUrls = await Promise.all(imageFiles.map(uploadImage)); // 이미지 업로드
    const subImageUrls = imageUrls.slice(1); // 0인덱스를 제외한 나머지 이미지를 서브이미지Url로 사용
    // 이미지 업로드가 모두 성공한 경우에만 데이터 전송
    if (imageUrls.every((url) => !!url)) {
      const modifiedBody = {
        ...body,
        bannerImageUrl: imageUrls[0],
        subImageUrls: [...subImageUrls],
      }; // 이미지 URL을 body에 추가
      await postData(modifiedBody); // 데이터 전송
    } else {
      console.error('이미지 업로드 실패');
    }
  } catch (error) {
    console.error('이미지 업로드 및 데이터 전송 오류:', error);
  }
};

export const getMyActivities = async (size: number, cursorId: number | null): Promise<MyActivitiesList> => {
  const response = await instance.get('my-activities', {
    params: {
      cursorId: cursorId,
      size: size,
    },
  });
  return response.data;
};

export const editMyActivities = async (id: string, body: EditActivityBody) => {
  const response = await instance.patch(`my-activities/${id}`, body);
  console.log(response.data);
};
