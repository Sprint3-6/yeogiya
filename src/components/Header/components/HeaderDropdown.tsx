import './headerDropdown.scss';
import { useDispatch } from 'react-redux';
import { clearMyInfo } from '@/redux/myInfoSlice';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import { useModal } from '@/hooks/useModal/useModal';
import Button from '@/components/Button';
import toast from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import MypageSideList from '@/components/MypageSidebar/components/MypageSideList';

interface DropDownProp {
  nickname: string;
  profile: string;
}

export default function HeaderDropDown({ profile, nickname }: DropDownProp) {
  const { Modal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 다시 한 번 로그아웃 할건지 묻는 모달
  const handleLogoutCheck = (value: DropDownValue) => {
    if (value === 'logout') {
      openModal('logout-checking');
    }
  };

  // 로그아웃 했을 때
  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearMyInfo());
    toast.success('다음번에도 이용해주세요');
  };

  // 로그아웃 취소 했을 때
  const handleLogoutCancel = () => {
    closeModal();
    toast.success('계속 이용해주셔서 감사합니다!');
  };

  return (
    <div>
      <div className="head-profile-dropdown">
        <DropDown id="head-profile" image={profile} title={nickname} onClickItem={handleLogoutCheck}>
          <DropdownItem value={'link'}>
            <MypageSideList />
          </DropdownItem>
          <hr></hr>
          <div className="head-profile-logout">
            <DropdownItem value={'logout'}>
              <div className="head-profile-logout-box">
                <img src="/assets/icons/icon-logout.png" alt="로그아웃" />
                로그아웃
              </div>
            </DropdownItem>
          </div>
        </DropDown>
      </div>
      <Modal name="logout-checking">
        <div className="logout-checking-modal">
          <div className="logout-checking-modal-title">
            <h3>진짜 로그아웃 하실건가요?</h3>
          </div>
          <div className="logout-checking-modal-button">
            <Button onClick={handleLogout} className="button-black">
              로그아웃
            </Button>
            <Button onClick={handleLogoutCancel} className="button-white">
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
