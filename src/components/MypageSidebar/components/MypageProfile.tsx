// import { createProfileImageUrl, myInfoEditApi } from '@/api/UsersApi';
// import Button from '@/components/Button';
// import { useModal } from '@/hooks/useModal/useModal';
// import { useAppSelector } from '@/redux/store';
// import { ChangeEvent, useEffect, useState } from 'react';

// export const MypageProfile = () => {
//   const userData = useAppSelector((state) => state.myInfo);
//   const defaultProfileImage = '/assets/images/profile-default.png';
//   const [isProfile, setIsPropfile] = useState(defaultProfileImage);
//   const [uploadProfile, setUploadProfile] = useState();
//   const { Modal, openModal, closeModal } = useModal();

//   useEffect(() => {
//     if (userData.profileImageUrl !== null) {
//       setIsPropfile(userData.profileImageUrl);
//     }
//   }, [userData]);

//   // const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//   //   const { files } = e.target;
//   //   const uploadFile = files[0];
//   //   console.log('업로드파일', uploadFile);
//   //   const profileCreateUrl = await createProfileImageUrl(uploadFile);
//   //   const reader = new FileReader();
//   //   reader.readAsDataURL(uploadFile);
//   //   reader.onloadend = () => {
//   //     setIsPropfile(reader.result);
//   //   };

//   //   console.log('이미지 업로드 성공?', profileCreateUrl);
//   //   openModal('profile-change');

//   //   console.log('프로필 변경', isProfile);
//   // };

//   // const handleProfileEidt = async () => {
//   //   try {
//   //     const profileImageUrl = {
//   //       profileImageUrl: isProfile,
//   //     };

//   //     const response = await myInfoEditApi(profileImageUrl);

//   //     console.log(profileImageUrl);
//   //     console.log('프로필 이미지 변경', response);
//   //   } catch (error) {
//   //     console.log('프로필변경시도 실패');
//   //   }
//   // };

//   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     const uploadFile = files[0];
//     // setUploadProfile(files[0]);
//     console.log('업로드파일', uploadFile);
//     const reader = new FileReader();
//     reader.readAsDataURL(uploadFile);
//     reader.onloadend = () => {
//       setUploadProfile(reader.result);
//     };
//     const profileCreateUrl = await createProfileImageUrl(uploadFile);
//     setIsPropfile(profileCreateUrl);

//     console.log('이미지 업로드 성공?', profileCreateUrl);
//     openModal('profile-change');

//     console.log('프로필 변경', isProfile);
//   };

//   const handleProfileEidt = async () => {
//     try {
//       const profileImageUrl = {
//         profileImageUrl: isProfile,
//       };

//       const response = await myInfoEditApi(profileImageUrl);

//       console.log(profileImageUrl);
//       console.log('프로필 이미지 변경', response);
//     } catch (error) {
//       console.log('프로필변경시도 실패');
//     }
//   };

//   const handleProfileEditCancel = () => {
//     console.log('프로필 이미지 변경 취소');
//     closeModal('profile-change');
//     // 모달 외부 눌렀을 때 변경 취소 함수 실행
//   };
//   // "/assets/images/profile-image.svg"

//   return (
//     <div className="mypage-side-profile-container">
//       <div className="mypage-side-profile">
//         <div className="side-profile">
//           <img src={isProfile} alt="프로필" />
//         </div>

//         <div className="side-icon">
//           <label htmlFor="profile">
//             <input
//               id="profile"
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: 'none', visibility: 'hidden' }}
//             />
//             <img src="/assets/icons/icon-pen.svg" />
//           </label>
//         </div>
//       </div>
//       <Modal name="profile-change">
//         <div className="profile-change-modal">
//           <div className="profile-change-modal-title">
//             <h3>프로필을 변경하시겠습니까?</h3>
//           </div>
//           <div className="profile-change-modal-button">
//             <Button onClick={handleProfileEidt}>변경하기</Button>
//             <Button onClick={handleProfileEditCancel}>취소하기</Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
