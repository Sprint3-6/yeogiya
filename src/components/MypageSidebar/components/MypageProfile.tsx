import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

export const MypageProfile = () => {
  const userData = useAppSelector((state) => state.myInfo);
  const defaultProfileImage = '/assets/images/profile-default.png';
  const [isProfile, setIsPropfile] = useState(defaultProfileImage);

  useEffect(() => {
    if (userData.profileImageUrl !== null) {
      setIsPropfile(userData.profileImageUrl);
    }
  }, [userData]);

  const handleProfile = () => {
    console.log('프로필 변경');
  };

  // "/assets/images/profile-image.svg"
  return (
    <div className="mypage-side-profile-container">
      <div className="mypage-side-profile">
        <div className="side-profile">
          <img src={isProfile} alt="프로필" />
          <div className="side-icon">
            <img src="/assets/icons/icon-pen.svg" onClick={handleProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};
