import './headerButton.scss';
import { Link } from 'react-router-dom';
import { useModal } from '@/hooks/useModal/useModal';
import { useAppSelector } from '@/redux/store';
import MyNotifications from '@/components/MyNotifications';
import HeaderDropDown from './HeaderDropdown';

export default function HeaderButtons() {
  const userData = useAppSelector((state) => state.myInfo);
  const { Modal, openModal, closeModal } = useModal();
  const defaultProfileImage = '/assets/images/profile-default.png';

  return (
    <>
      {userData.id !== null ? (
        <div className="header-login">
          <img
            src="/assets/icons/icon-notification.svg"
            alt="알림 아이콘"
            onClick={() => openModal('header-notifications')}
            className="header-notifications-icon"
          />
          <img src="/assets/icons/icon-vector.svg" alt="아이콘 구분선" />
          <div className="header-login-user" onClick={() => openModal('header-dropdown')}>
            <img src={userData.profileImageUrl || defaultProfileImage} alt="프로필 사진" />
            <span>{userData.nickname}</span>
          </div>
          <Modal name="header-notifications">
            <div className="header-notifications-container">
              <MyNotifications onClose={closeModal} />
            </div>
          </Modal>
          <Modal name="header-dropdown">
            <div className="header-dropdown-container">
              <HeaderDropDown onClose={closeModal} />
            </div>
          </Modal>
        </div>
      ) : (
        <div className="header-buttons">
          <Link to="/sign-in">
            <button className="header-button">로그인</button>
          </Link>
          <Link to="/sign-up">
            <button className="header-button">회원가입</button>
          </Link>
        </div>
      )}
    </>
  );
}
