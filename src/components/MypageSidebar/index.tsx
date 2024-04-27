import { Link } from 'react-router-dom';
import './style.scss';
export default function MypageSidebar() {
  return (
    <div className="side">
      마이페이지 사이드바입니다
      <div>
        <Link to={'mypage'}>내정보</Link>
        <br />
        <Link to={'mypage/reservation'}>예약내역</Link>
        <br />
        <Link to={'mypage/admin'}>내 공간 관리</Link>
        <br />
        <Link to={'mypage/admin/add'}>내 공간 등록</Link>
        <br />
        <Link to={'mypage/admin/status'}>예약현황</Link>
        <br />
      </div>
    </div>
  );
}
