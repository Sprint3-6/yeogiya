import { Link } from 'react-router-dom';
import './style.scss';
import { UserForm } from '@/components/UserForm';
import { useState } from 'react';
import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
import { SignLogo } from '@/components/SignLogo';
import { login } from '@/api/authApi';

export default function SignIn() {
  const [LoginValue, setLoginValue] = useState({
    email: '',
    password: '',
  });
  const handleLogin = async (value) => {
    setLoginValue(value);
    console.log('로그인페이지 함수', LoginValue);

    try {
      const response = await login(value);
      console.log('로그인 시도', response);

      const data = await response.json();

      if (response.ok) {
        console.log('로그인 성공', data);
      } else if (response.status === 400) {
        console.log('로그인 400 오류', data);
      } else if (response.status === 404) {
        console.log('로그인 404 오류', data);
      }
    } catch (error) {
      console.log('로그인 실패');
    }
  };

  return (
    <main>
      로그인 페이지 입니다.
      <SignLogo />
      <UserForm onClickForm={handleLogin} value={LoginValue}>
        <UserInputItem id="email" type="email" text="이메일을 입력해 주세요">
          이메일
        </UserInputItem>
        <UserInputItem id="password" type="password" text="비밀번호를 입력해 주세요">
          비밀번호
        </UserInputItem>
        <UserButtonItem>로그인 버튼</UserButtonItem>
      </UserForm>
      <div>이메일 입력: {LoginValue.email}</div>
      <div>비밀번호 입력 : {LoginValue.password}</div>
      <div>버튼</div>
      <div>
        회원이 아니신가요? <Link to="/sign-up">회원가입하기</Link>
      </div>
    </main>
  );
}
