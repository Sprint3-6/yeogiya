import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import '../style.scss';
import { myInfoEditApi, myInfoGetApi } from '@/api/UsersApi';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export interface myInfoValue {
  nickname: string;
  profileImageUrl: File;
  password: string;
}

export const MyPageList = () => {
  const [myInfoValue, setMyInfoValue] = useState({
    nickname: '',
    profileImageUrl: '',
    password: '',
  });
  // const myNewInfo = {
  //   nickname: '',
  //   profileImageUrl: '',
  //   newPassword: '',
  // };

  // const MyPageValue = {
  //   nickname: '냠냠',
  //   profileImageUrl: null,
  //   password: '22222222',
  // };

  // const MyProfileValue = {
  //   profileImageUrl: '',
  // };

  useEffect(() => {
    const myInfoGet = async () => {
      try {
        const response = await myInfoGetApi();

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

  const handleEditMyInfo = async () => {
    try {
      const response = await myInfoEditApi(MyPageValue);

      console.log('내 정보 수정 페이지 성공', response);
    } catch (error) {
      console.log('내 정보 수정 페이지 실패', error);
    }
  };

  return (
    <div className="mypage-list">
      <UserForm onClickForm={handleMypageInfo} value={'냠'}>
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
        <Button onClick={handleEditMyInfo}>수정하자</Button>
      </UserForm>
    </div>
  );
};
