// import { Link, useNavigate } from 'react-router-dom';
// import './style.scss';
// import { InputValue, UserForm } from '@/components/UserForm';
// import { UserInputItem } from '@/components/UserForm/components/UserInputItem';
// import { UserButtonItem } from '@/components/UserForm/components/UserButtonItem';
// import { SignLogo } from '@/components/SignLogo';
// import { login } from '@/api/authApi';
// import { setMyInfo } from '@/redux/myInfoSlice';
// import getMyInfo from '@/api/getMyInfo';
// import { useDispatch } from 'react-redux';

// export interface LoginResponse {
//   status: number;
//   message: string;
// }

// export default function SignIn() {
//   const LoginValue = {
//     email: '',
//     password: '',
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = async (value: InputValue): Promise<void> => {
//     console.log('로그인페이지 함수', LoginValue);

//     const email: string = value.email || '';
//     const password: string = value.password || '';

//     try {
//       const response = await login(email, password);
//       console.log('로그인 시도', response);

//       if (response.status === 201) {
//         console.log('로그인성공선영');
//         navigate('/');
//         dispatch(setMyInfo(await getMyInfo(email, password)));
//       } else {
//         console.log('로그인실패선영');
//       }

//       console.log('메시지', response);
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
