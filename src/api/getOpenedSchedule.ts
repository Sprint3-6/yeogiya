import { BASE_URL } from './constants/url';
import { ErrorType } from './types/axiosErrorType';
import instance from './instance/defaultInstance';
type Type = string | undefined;
async function getOpenedSchedule(id: Type, year: Type, month: Type) {
  try {
    const detail = await instance.get(`${BASE_URL}activities/${id}/available-schedule?year=${year}&month=${month}`);
    return detail.data;
  } catch (err) {
    const error = err as ErrorType;
    console.log(error);
  }
}

export default getOpenedSchedule;
