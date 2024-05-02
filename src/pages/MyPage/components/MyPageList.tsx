import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import '../style.scss';
import { myinfoGetApi } from '@/api/UsersApi';
import { useEffect, useState } from 'react';

export const MyPageList = () => {
  const [myInfoValue, setMyInfoValue] = useState({
    nickname: '',
    email: '',
    profileImageUrl: '',
  });
  // const myNewInfo = {
  //   nickname: '',
  //   profileImageUrl: '',
  //   newPassword: '',
  // };

  const MyPageValue = {
    nickname: '',
    password: '',
  };

  // const MyProfileValue = {
  //   profileImageUrl: '',
  // };

  useEffect(() => {
    const myInfoGet = async () => {
      try {
        const response = await myinfoGetApi();

        setMyInfoValue({
          nickname: response.nickname,
          email: response.email,
          profileImageUrl: response.profileImageUrl,
        });
        console.log('내 정보 조회', response);
      } catch (error) {
        console.log(error);
      }
    };
    myInfoGet();
  }, []);

  const handleMypageInfo = () => {
    console.log('받았다');
  };

  return (
    <div className="mypage-list">
      <UserForm onClickForm={handleMypageInfo} value={MyPageValue}>
        <UserInputItem id="nickname" type="text" text={myInfoValue.nickname}>
          닉네임
        </UserInputItem>
        <UserInputItem id="email" type="email" value={myInfoValue.email} disabled={true}>
          이메일
        </UserInputItem>
        <UserInputItem id="password" type="password" text="8자 이상 입력해 주세요">
          비밀번호
        </UserInputItem>
        <UserInputItem id="passwordCheck" type="password" text="비밀번호를 한 번 더 입력해주세요">
          비밀번호 재입력
        </UserInputItem>
      </UserForm>
    </div>
  );
};
