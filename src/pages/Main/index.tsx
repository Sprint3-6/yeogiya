import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMyInfo } from '../../redux/myInfoSlice';
import Loading from '../Loading';
import getMyInfo from '../../api/getMyInfo';

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
