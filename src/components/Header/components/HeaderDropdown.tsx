import './headerDropdown.scss';
import { useDispatch } from 'react-redux';
import { clearMyInfo } from '@/redux/myInfoSlice';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import MypageSidebar from '@/components/MypageSidebar';
import { useModal } from '@/hooks/useModal/useModal';
import Button from '@/components/Button';
import toast from '@/utils/toast';

interface DropDownProp {
  nickname: string;
  profile: string;
}

export default function HeaderDropDown({ profile, nickname }: DropDownProp) {
  const { Modal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  console.log(nickname);

  // 다시 한 번 로그아웃 할건지 묻는 모달
  const handleLogoutCheck = (value: DropDownValue) => {
    if (value === 'logout') {
      openModal('logout-checking');
    }
  };

  // 로그아웃 했을 때
  const handleLogout = () => {
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
            <MypageSidebar />
          </DropdownItem>
          <div className="head-profile-logout">
            <DropdownItem value={'logout'}>로그아웃</DropdownItem>
          </div>
        </DropDown>
      </div>
      <Modal name="logout-checking">
        <div className="logout-checking-modal">
          진짜 로그아웃 하실건가요?
          <div className="logout-checking-modal-button">
            <Button onClick={handleLogout}>로그아웃</Button>
            <Button onClick={handleLogoutCancel}>취소</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
