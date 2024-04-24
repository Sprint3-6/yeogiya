import './headerButton.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMyInfo, myInfo } from '@/redux/myInfoSlice';
import { useModal } from '@/hooks/useModal/useModal';
import getMyInfo from '@/api/getMyInfo';
import MyNotifications from '@/components/MyNotifications';
import HeaderDropDown from './HeaderDropdown';
import Loading from '@/pages/Loading';

export default function HeaderButtons() {
  const userData = useSelector(myInfo);
  const { Modal, openModal, closeModal } = useModal();
  const defaultProfileImage = '/public/assets/images/profile-default.png';

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTempLogin = async () => {
    const id = prompt('이메일');
    const password = prompt('비밀번호');
    setIsLoading(true);
    dispatch(setMyInfo(await getMyInfo(id, password)));
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {userData.id !== null ? (
        <div className="header-login">
          <img
            src="/public/assets/icons/icon-notification.svg"
            alt="알림 아이콘"
            onClick={() => openModal('header-notifications')}
            className="header-notifications-icon"
          />
          <img src="/public/assets/icons/icon-vector.svg" alt="아이콘 구분선" />
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
          <button className="header-button" onClick={handleTempLogin}>
            로그인
          </button>
          <Link to="/sign-up">
            <button className="header-button">회원가입</button>
          </Link>
        </div>
      )}
    </>
  );
}
