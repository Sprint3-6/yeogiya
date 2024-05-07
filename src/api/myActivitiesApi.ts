import instance from './instance/defaultInstance';
import { EditActivityBody, MyActivitiesList } from './types/myActivities';

export const getMyActivities = async (size: number, cursorId: number | null) => {
  try {
    const response = await instance.get<MyActivitiesList>('my-activities', {
      params: {
        cursorId: cursorId,
        size: size,
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 공간 불러오기 오류:', error);
    throw error;
  }
};

export const editMyActivities = async (id: string, body: EditActivityBody) => {
  await instance.patch(`my-activities/${id}`, body);
};
