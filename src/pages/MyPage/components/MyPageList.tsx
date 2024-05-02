import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import '../style.scss';

export const MyPageList = () => {
  const MyPageValue = {
    nickname: '',
    password: '',
  };

  const handleMypageInfo = () => {
    console.log('받았다');
  };
  return (
    <div className="mypage-list">
      <UserForm onClickForm={handleMypageInfo} value={MyPageValue}>
        <UserInputItem id="nickname" type="text" text="ㄴㄴ">
          닉네임
        </UserInputItem>
        <UserInputItem id="" type="text" text="ㄴㄴ">
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
