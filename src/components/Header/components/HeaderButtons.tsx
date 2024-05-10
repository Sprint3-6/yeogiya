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

  //TODO 프로필 사진 동그랗게
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
          <div className="header-login-user">
            <HeaderDropDown
              profile={userData.profileImageUrl ? userData.profileImageUrl : defaultProfileImage}
              nickname={userData.nickname}
            />
          </div>
          <Modal name="header-notifications" classNameLayout="header-modal-layout" classNameModal="header-modal">
            <div className="header-notifications-container">
              <MyNotifications onClose={closeModal} />
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
