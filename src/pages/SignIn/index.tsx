import { Link } from 'react-router-dom';
import './style.scss';

export default function SignIn() {
  return (
    <main>
      로그인 페이지 입니다.
      <div>
        <Link to="/">
          <img src="/assets/logos/logo-big.svg" alt="메인 이동" />
        </Link>
      </div>
      <div>이메일</div>
      <div>비밀번호</div>
      <div>버튼</div>
      <div>회원이 아니신가요? 회원가입하기</div>
    </main>
  );
}
