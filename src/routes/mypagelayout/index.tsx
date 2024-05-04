import { Navigate, Outlet } from 'react-router-dom';
import './style.scss';
import MypageSidebar from '@/components/MypageSidebar';

export default function MypageLayout() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return <Navigate replace to="sign-in" />;
  }

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
