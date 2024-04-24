import './headerDropdown.scss';
import { useDispatch } from 'react-redux';
import { clearMyInfo } from '@/redux/myInfoSlice';
import { Link } from 'react-router-dom';

interface DropDownProp {
  onClose: () => void;
}

export default function HeaderDropDown({ onClose }: DropDownProp) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    dispatch(clearMyInfo());
  };

  return (
    <ul className="header-dropdown-list">
      <Link to="mypage" onClick={onClose}>
        <li>마이페이지</li>
      </Link>
      <li onClick={handleLogout}>로그아웃</li>
    </ul>
  );
}
