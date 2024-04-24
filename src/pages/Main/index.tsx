import getMyInfo from '@/api/getMyInfo';
import { setMyInfo } from '@/redux/myInfoSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

import './style.scss';

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTempLogin = async () => {
    const id = prompt('이메일');
    const password = prompt('비밀번호');
    setIsLoading(true);
    dispatch(setMyInfo(await getMyInfo(id, password)));
    setIsLoading(false);
  };

  return (
    <main>
      {isLoading && <Loading />}
      메인페이지 입니다.
      <br />
      <Link to={'sign-in'}>로그인</Link>
      <br />
      <Link to={'sign-up'}>회원가입</Link>
      <br />
      <Link to={'mypage'}>내정보</Link>
      <br />
      <Link to={'mypage/reservation'}>예약내역</Link>
      <br />
      <Link to={'mypage/admin/status'}>예약현황</Link>
      <br />
      <Link to={'mypage/admin'}>내 공간 관리</Link>
      <br />
      <Link to={'space/718'}>공간상세(내꺼)</Link>
      <br />
      <Link to={'space/704'}>공간상세(내꺼아님)</Link>
      <button className="temp-login" onClick={handleTempLogin}>
        로그인하기
      </button>
    </main>
  );
}
