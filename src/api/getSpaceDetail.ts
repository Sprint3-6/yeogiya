import { BASE_URL } from './constants/url';
import { ErrorType } from './types/axiosErrorType';
import instance from './instance/defaultInstance';
import toast from '@/utils/toast';

async function getSpaceDetail(id: string | undefined, navigate: (path: string) => void) {
  try {
    const detail = await instance.get(`${BASE_URL}activities/${id}`);
    return detail.data;
  } catch (err) {
    const error = err as ErrorType;
    if (error.response.status === 404) {
      navigate('404');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      toast.warning(error.response.data.message);
      navigate('/');
    }
  }
}

export default getSpaceDetail;
