import { Link } from 'react-router-dom';
import instance from '../../api/instance/defaultInstance';

import './style.scss';

interface ErrorType {
  response: {
    data: {
      message: string;
    };
  };
}

const handleTempLogin = async () => {
  const id = prompt('이메일');
  try {
    if (id) {
      const password = prompt('비밀번호');
      if (password) {
        const response = await instance.post('https://sp-globalnomad-api.vercel.app/3-6/auth/login', {
          email: id,
          password: password,
        });
        alert(`${id}로 로그인 되었습니다.(자세한건 콘솔창 참조)`);
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      } else {
        alert('취소함');
      }
    } else {
      alert('취소함');
    }
  } catch (err) {
    const error = err as ErrorType;
    alert(error.response.data.message);
  }
};

export default function MainPage() {
  return (
    <main>
      메인페이지 입니다.
      <br />
      <Link to={'sign-in'}>로그인</Link>
      <br />
      <Link to={'sign-up'}>회원가입</Link>
      <br />
      <Link to={'my-info'}>내정보</Link>
      <br />
      <Link to={'reservation-details'}>예약내역</Link>
      <br />
      <Link to={'reservation-status'}>예약현황</Link>
      <br />
      <Link to={'activity-management'}>내 체험 관리</Link>
      <br />
      <br />
      <Link to={'activity/1'}>체험상세 1번</Link>
      <br />
      <Link to={'activity/2'}>체험상세 2번</Link>
      <br />
      <Link to={'activity/3'}>체험상세 3번</Link>
      <button className="temp-login" onClick={handleTempLogin}>
        로그인하기
      </button>
    </main>
  );
}
