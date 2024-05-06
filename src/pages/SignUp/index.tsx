import { SignLogo } from '@/components/SignLogo';
import './style.scss';
import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
import { Link, useNavigate } from 'react-router-dom';
import { signUpApi } from '@/api/UsersApi';
import toast from '@/utils/toast';
import { InputValue } from '@/components/UserForm/types';

export default function SignUp() {
  const SignUpValue = {
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  };

  const requiredValue = {
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  };

  const navigate = useNavigate();

  const handleSignUp = async (value: InputValue): Promise<void> => {
    try {
      const response = await signUpApi(value);
      console.log('회원가입 시도', response);

      if (response?.status === 201) {
        console.log('회원가입 성공');
        toast.success('회원가입을 축하합니다');
        navigate('/sign-in');
      }
    } catch (error) {
      console.log('회원가입 페이지 실패', error);
    }

    console.log('회원가입 페이지 함수', SignUpValue);
  };
  return (
    <main className="signup-main">
      <div className="signup-logo">
        <SignLogo />
      </div>
      <UserForm onClickForm={handleSignUp} value={SignUpValue} requiredValue={requiredValue}>
        <UserInputItem id="email" type="email" text="이메일을 입력해 주세요">
          이메일
        </UserInputItem>
        <UserInputItem id="nickname" type="nickname" text="닉네임을 입력해 주세요">
          닉네임
        </UserInputItem>
        <UserInputItem id="password" type="password" text="8자 이상 입력해 주세요">
          비밀번호
        </UserInputItem>
        <UserInputItem id="passwordCheck" type="password" text="비밀번호를 한 번 더 입력해 주세요">
          비밀번호 확인
        </UserInputItem>
        <UserButtonItem>회원가입 하기</UserButtonItem>
      </UserForm>
      <div className="signup-text">
        회원이신가요?{' '}
        <Link to="/sign-in" className="sign-link">
          로그인하기
        </Link>
      </div>
    </main>
  );
}
