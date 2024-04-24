import { Link } from 'react-router-dom';

import './style.scss';

export default function MainPage() {
  return (
    <main>
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
      <Link to={'space/718'}>공간상세</Link>
    </main>
  );
}
