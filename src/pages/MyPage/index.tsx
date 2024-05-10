import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { myInfoEditApi, myInfoGetApi } from '@/api/UsersApi';
import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
import { useDispatch } from 'react-redux';
import { setMyInfo } from '@/redux/myInfoSlice';
import './style.scss';
import { MypageProfile } from '@/components/MypageSidebar/components/MypageProfile';
import toast from '@/utils/toast';
import { InputValue } from '@/components/UserForm/types';

export default function MyPage() {
  const userData = useAppSelector((state) => state.myInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('정보 변경됨 useEffect');
  }, [userData]);

  const UpdateInfoValue = {
    nickname: '',
    password: '',
    passwordCheck: '',
  };

  // 필수인풋값
  const requiredValue = {};

  const handleEditMyInfo = async (value: InputValue): Promise<void> => {
    // 값이 비어있을 경우 해당 key값 삭제
    for (const key in value) {
      if (value[key] === '' || value[key] === null) {
        delete value[key];
      }
    }
    try {
      const response = await myInfoEditApi(value);
      if (response?.status === 200) {
        toast.success('내 정보 변경 완료');
        dispatch(setMyInfo(await myInfoGetApi()));
      }
    } catch (error) {
      console.log('내 정보 수정 페이지 실패', error);
    }
  };

  return (
    <div className="mypage-space">
      <UserForm onClickForm={handleEditMyInfo} value={UpdateInfoValue} requiredValue={requiredValue}>
        <div className="my-profile-header">
          <div className="my-profile-header-title">
            <h2>내 정보</h2>
            <div className="my-profile-show-Image">
              <MypageProfile />
            </div>
          </div>
          <div className="my-profile-header-button">
            <UserButtonItem>저장하기</UserButtonItem>
          </div>
        </div>
        <div className="mypage-list">
          <UserInputItem id="nickname" type="text" text={userData.nickname}>
            닉네임
          </UserInputItem>
          <UserInputItem id="email" type="email" value={userData.email} disabled={true}>
            이메일
          </UserInputItem>
          <UserInputItem id="password" type="password" text="8자 이상 입력해 주세요">
            비밀번호
          </UserInputItem>
          <UserInputItem id="passwordCheck" type="password" text="비밀번호를 한 번 더 입력해주세요">
            비밀번호 재입력
          </UserInputItem>
        </div>
      </UserForm>
    </div>
  );
}
