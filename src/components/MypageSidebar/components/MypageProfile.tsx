import { createProfileImageUrl, myInfoEditApi } from '@/api/UsersApi';
import Button from '@/components/Button';
import { useModal } from '@/hooks/useModal/useModal';
import { useAppSelector } from '@/redux/store';
import { ChangeEvent, FC, useEffect, useState } from 'react';

export const MypageProfile: FC = () => {
  const userData = useAppSelector((state) => state.myInfo);
  const defaultProfileImage: string = '/assets/images/profile-default.png';
  const [isProfile, setIsPropfile] = useState(defaultProfileImage);
  const [isPrevProfile, setIsPrevProfile] = useState<string | null>(null);
  const [uploadProfile, setUploadProfile] = useState<File | null>(null);
  const { Modal, openModal, closeModal } = useModal();
  const PROFILE_MODAL = 'profile-change';

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    // 선택한 파일 가져오기
    const newFiles: File | null = e.target.files?.[0] || null;

    if (!newFiles) return;

    // FileReader 객체 생성
    setUploadProfile(newFiles);
    const reader = new FileReader();
    reader.readAsDataURL(newFiles);

    reader.onload = function (e: ProgressEvent<FileReader>) {
      // 읽은 파일 데이터 가져오기
      const fileData = e.target?.result;
      setIsPrevProfile(fileData as string);
    };
    openModal(PROFILE_MODAL);
  };

  const handleProfileUpload = async (): Promise<void> => {
    if (!uploadProfile) return;
    try {
      // 이미지 URL 업로드
      const newProfile = await createProfileImageUrl(uploadProfile);

      // 이미지 정보 수정
      const response = await myInfoEditApi(newProfile);

      console.log('프로필 이미지 변경', response);
    } catch (error) {
      console.log('프로필변경시도 실패');
    }
  };

  const handleProfileUploadCancel = () => {
    setIsPrevProfile(null);
    setUploadProfile(null);

    console.log('프로필 이미지 변경 취소');
    closeModal();
    // 모달 외부 눌렀을 때 변경 취소 함수 실행
  };
  // "/assets/images/profile-image.svg"

  useEffect(() => {
    if (userData.profileImageUrl !== null) {
      setIsPropfile(userData.profileImageUrl);
    }
  }, [userData]);

  return (
    <div className="mypage-side-profile-container">
      <div className="mypage-side-profile">
        <div className="side-profile">
          <img src={isPrevProfile ? isPrevProfile : isProfile} alt="프로필" />
        </div>

        <div className="side-icon">
          <label htmlFor="profile">
            <input
              id="profile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none', visibility: 'hidden' }}
            />
            <img src="/assets/icons/icon-pen.svg" />
          </label>
        </div>
      </div>
      <Modal name={PROFILE_MODAL}>
        <div className="profile-change-modal">
          <div className="profile-change-modal-title">
            <h3>프로필을 변경하시겠습니까?</h3>
          </div>
          <div className="profile-change-modal-button">
            <Button onClick={handleProfileUpload}>변경하기</Button>
            <Button onClick={handleProfileUploadCancel}>취소하기</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
