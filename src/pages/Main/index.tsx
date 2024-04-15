import { Link } from 'react-router-dom';

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
      <Link to={'activity/1'}>체험상세 2번</Link>
      <br />
      <Link to={'activity/1'}>체험상세 3번</Link>
    </main>
  );
}
