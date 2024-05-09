import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import { UserForm } from '@/components/UserForm';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
import { SignLogo } from '@/components/SignLogo';
import { login } from '@/api/authApi';
import { setMyInfo } from '@/redux/myInfoSlice';
import getMyInfo from '@/api/getMyInfo';
import { useDispatch } from 'react-redux';
import { InputValue } from '@/components/UserForm/types';

export interface LoginResponse<T> {
  data: string;
  status: number;
  message: string;
  result: T;
}

export default function SignIn() {
  const SignInValue = {
    email: '',
    password: '',
  };
  const requiredValue = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignIn = async (value: InputValue): Promise<void> => {
    const email: string = value.email || '';
    const password: string = value.password || '';

    try {
      const response = await login(value);
      if (response?.status === 201) {
        if (location.state && location.state.from) {
          navigate(location.state.from);
        } else {
          navigate('/');
        }
        dispatch(setMyInfo(await getMyInfo(email, password)));
      } else {
        console.log('로그인실패');
      }
    } catch (error) {
      console.log('로그인 실패');
    }
  };

  return (
    <main className="signin-main">
      <div className="signin-logo">
        <SignLogo />
      </div>
      <UserForm onClickForm={handleSignIn} value={SignInValue} requiredValue={requiredValue}>
        <UserInputItem id="email" type="email" text="이메일을 입력해 주세요">
          이메일
        </UserInputItem>
        <UserInputItem id="password" type="password" text="비밀번호를 입력해 주세요">
          비밀번호
        </UserInputItem>
        <UserButtonItem>로그인</UserButtonItem>
      </UserForm>
      <div className="signin-text">
        회원이 아니신가요?{' '}
        <Link to="/sign-up" className="sign-link">
          회원가입하기
        </Link>
      </div>
    </main>
  );
}
