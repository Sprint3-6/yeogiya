import './style.scss';
import { MypageProfile } from './components/MypageProfile';
import MypageSideList from './components/MypageSideList';

export default function MypageSidebar() {
  return (
    <div className="mypage-side-container">
      <MypageProfile />
      <MypageSideList />
    </div>
  );
}
