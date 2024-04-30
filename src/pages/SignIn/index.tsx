// import { Link, redirect } from 'react-router-dom';
// import './style.scss';
// import { UserForm } from '@/components/UserForm';
// import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
// import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
// import { SignLogo } from '@/components/SignLogo';
// import { login } from '@/api/authApi';

// export default function SignIn() {
//   const LoginValue = {
//     email: '',
//     password: '',
//   };
//   const handleLogin = async (value) => {
//     console.log('로그인페이지 함수', LoginValue);

//     const email = value.email;
//     const password = value.password;

//     try {
//       const response = await login(email, password);
//       console.log('로그인 시도', response.status);

//       if (response.status) {
//         console.log('로그인성공선영');
//         // return <redirect to="/" />;
//       } else {
//         console.log('로그인실패선영');
//       }

//       console.log('메시지', response.response.data.message);
//     } catch (error) {
//       console.log('로그인 실패');
//     }
//   };

//   return (
//     <main className="signin-main">
//       로그인 페이지 입니다.
//       <SignLogo />
//       <UserForm onClickForm={handleLogin} value={LoginValue}>
//         <UserInputItem id="email" type="email" text="이메일을 입력해 주세요">
//           이메일
//         </UserInputItem>
//         <UserInputItem id="password" type="password" text="비밀번호를 입력해 주세요">
//           비밀번호
//         </UserInputItem>
//         <UserButtonItem>로그인 버튼</UserButtonItem>
//       </UserForm>
//       <div>
//         회원이 아니신가요? <Link to="/sign-up">회원가입하기</Link>
//       </div>
//     </main>
//   );
// }
