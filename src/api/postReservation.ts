import { ErrorType } from './types/axiosErrorType';
import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';
import toast from '@/utils/toast';

async function postReservation(id: string | undefined, scheduleId: number | null, howMany: number) {
  try {
    await instance.post(`${BASE_URL}activities/${id}/reservations`, {
      scheduleId: scheduleId,
      headCount: howMany,
    });
    toast.success('예약이 완료되었습니다.');
  } catch (err) {
    const error = err as ErrorType;
    toast.warning(error.response.data.message);
  }
}

export default postReservation;
