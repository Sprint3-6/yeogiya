import instance from './instance/defaultInstance';
import { EditActivityBody, MyActivitiesList } from './types/myActivities';

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
  console.log(body);
  const response = await instance.patch(`my-activities/${id}`, body);
  console.log(response.data);
};
