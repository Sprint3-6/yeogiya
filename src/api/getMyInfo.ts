import { BASE_URL } from './constants/url';
import toast from '../utils/toast';
import instance from './instance/defaultInstance';
import { ErrorType } from './types/axiosErrorType';

async function getMyInfo(id: string | null, password: string | null) {
  try {
    const response = await instance.post(`${BASE_URL}auth/login`, {
      email: id,
      password: password,
    });
    toast.success(`${id}로 로그인 되었습니다.(자세한건 콘솔창)`);
    console.log(response);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.user;
  } catch (err) {
    const error = err as ErrorType;
    alert(error.response.data.message);
  }
}

export default getMyInfo;
