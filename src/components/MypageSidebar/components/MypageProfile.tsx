// import { useAppSelector } from '@/redux/store';
// import { ChangeEvent, useEffect, useState } from 'react';

// export const MypageProfile = () => {
//   const userData = useAppSelector((state) => state.myInfo);
//   const defaultProfileImage = '/assets/images/profile-default.png';
//   const [isProfile, setIsPropfile] = useState(defaultProfileImage);

//   useEffect(() => {
//     if (userData.profileImageUrl !== null) {
//       setIsPropfile(userData.profileImageUrl);
//     }
//   }, [userData]);

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     const uploadFile = files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(uploadFile);
//     reader.onloadend = () => {
//       setIsPropfile(reader.result);
//     };

//     // const reader = new FileReader();
//     console.log('프로필 변경', isProfile);
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
//     </div>
//   );
// };
