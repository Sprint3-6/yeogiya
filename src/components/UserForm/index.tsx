// import { createContext, useState } from 'react';

// export interface InputValue {
//   email?: string;
//   nickname?: string;
//   password?: string;
//   passwordCheck?: string;
// }

// interface LoginFormProps {
//   value: InputValue;
//   onClickForm: (value: InputValue) => void;
//   children: React.ReactNode;
// }

// interface LoginContextProps {
//   handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleError: (id: string) => void;
//   inputValue: InputValue;
//   error: InputValue;
// }

// export const LoginContext = createContext<LoginContextProps>({
//   handleInput: () => {},
//   handleError: () => {},
//   inputValue: {},
//   error: {},
// });

// export const UserForm = (props: LoginFormProps) => {
//   const { children, onClickForm } = props;
//   const [inputValue, setInputValue] = useState<InputValue>(props.value);
//   const [error, setError] = useState<InputValue>({});
//   const [isErrorCheck, setIsErrorCheck] = useState(false);
//   const [isButton, setIsButton] = useState(false);

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const id = e.target.id;
//     const value = e.target.value;
//     setInputValue({
//       ...inputValue,
//       [id]: value,
//     });
//     console.log('로그인폼 컴포넌트 아이디', id);
//     console.log('로그인폼 컴포넌트 값', inputValue);

//     if (isErrorCheck) {
//       handleError(id);
//     }
//   };

//   // const errorArray = Object.entries(newError).map(([_, value]) => value);
//   // console.log('에러배열', errorArray);
//   // if (ee) {
//   //   console.log('모두 투루다', ee);
//   // } else {
//   //   console.log('에러가 있다');
//   // }
//   // setIsButton(nowError);

//   // setIsButton = newError.map((e) => Boolean(e) === false);

//   // console.log('뉴에러불린반대값', isButton);
//   // !newError && setIsButton(!isButton);

//   const handleError = (id: string) => {
//     setIsErrorCheck(true);
//     console.log('에러 검사', error);
//     console.log('에러검사할 아이디', id);

//     const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (id === 'email') {
//       if (!inputValue.email || !emailCheck.test(inputValue.email)) {
//         console.log('이메일 에러남');
//         setError({
//           ...error,
//           email: '잘못된 이메일입니다.',
//         });
//       } else {
//         setError({
//           ...error,
//           email: '',
//         });
//         console.log('이메일 에러 안 남');
//       }
//     }

//     if (id === 'password') {
//       if (!inputValue.password || inputValue.password.length < 8) {
//         // newError.password = '비밀번호 8자 입력';
//         setError({
//           ...error,
//           password: '8자 이상 입력해주세요',
//         });
//       } else {
//         setError({
//           ...error,
//           password: '',
//         });
//       }
//     }

//     // setError(newError);
//   };

//   const handleClickForm = (e: React.FormEvent<HTMLFormElement>) => {
//     console.log('로그인컴포넌트 버튼 클릭함', inputValue);
//     onClickForm(inputValue);
//     // handleError(props.id);
//     e.preventDefault();
//   };

//   const contextValue: LoginContextProps = {
//     handleInput,
//     handleError,
//     handleClickForm,
//     inputValue,
//     error,
//   };

//   return (
//     <LoginContext.Provider value={contextValue}>
//       <div className="form-box">
//         {/* <form onSubmit={(e) => handleClickForm(e)}> */}
//         <form>
//           로그인 폼<div>{children}</div>
//         </form>
//       </div>
//     </LoginContext.Provider>
//   );
// };
