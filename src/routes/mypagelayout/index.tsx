import { Outlet } from 'react-router-dom';
import './style.scss';
import MypageSidebar from '@/components/MypageSidebar';

export default function MypageLayout() {
  return (
    <>
      <sub>
        <div className="mypage-side">
          <MypageSidebar />
        </div>
        <Outlet />
      </sub>
    </>
  );
}
