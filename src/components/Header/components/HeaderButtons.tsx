import './headerButton.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMyInfo } from '@/redux/myInfoSlice';
import { useModal } from '@/hooks/useModal/useModal';
import { useAppSelector } from '@/redux/store/store';
import getMyInfo from '@/api/getMyInfo';
import MyNotifications from '@/components/MyNotifications';
import HeaderDropDown from './HeaderDropdown';
import Loading from '@/pages/Loading';

export default function HeaderButtons() {
  const userData = useAppSelector((state) => state.myInfo);
  const { Modal, openModal, closeModal } = useModal();
  const defaultProfileImage = '/assets/images/profile-default.png';

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTempLogin = async () => {
    const id = prompt('이메일');
    const password = prompt('비밀번호');
    setIsLoading(true);
    dispatch(setMyInfo(await getMyInfo(id, password)));
    setIsLoading(false);
  };

  //TODO 이미지 앞에 public 앞에 삭제

  return (
    <>
      {isLoading && <Loading />}
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
