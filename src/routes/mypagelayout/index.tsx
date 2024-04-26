import { Outlet } from 'react-router-dom';
import './style.scss';
import MypageSide from '@/components/MypageSide';

export default function MypageLayout() {
  return (
    <>
      <sub>
        <MypageSide />
        <Outlet />
      </sub>
    </>
  );
}
