import { createContext, useState } from 'react';

interface InputValue {
  email?: string;
  nickname?: string;
  password?: string;
  passwordCheck?: string;
}

interface LoginFormProps {
  value: InputValue;
  onClickForm: (value: InputValue) => void;
  children: React.ReactNode;
}

interface LoginContextProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleError: (id: string) => void;
  inputValue: InputValue;
  error: InputValue;
}

export const LoginContext = createContext<LoginContextProps>({
  handleInput: () => {},
  handleError: () => {},
  inputValue: {},
  error: {},
});

export const UserForm = (props: LoginFormProps) => {
  const { children, onClickForm } = props;
  const [inputValue, setInputValue] = useState(props.value);
  const [error, setError] = useState({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [id]: value,
    });
    console.log('로그인폼 컴포넌트 아이디', id);
    console.log('로그인폼 컴포넌트 값', inputValue);
  };

  const handleError = (id: string) => {
    console.log('에러 검사', error);
    console.log('에러검사할 아이디', id);

    // const newError = {
    //   email: '',
    //   password: '',
    // };
    // 이메일 유효성 검사
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (id === 'email') {
      if (!inputValue.email || !emailCheck.test(inputValue.email)) {
        console.log('이메일 에러남');
        // newError.email = '이메일 형식으로 작성해 주세요';
        setError({
          ...error,
          email: '잘못된 이메일입니다.',
        });
      } else {
        setError({
          ...error,
          email: '',
        });
        console.log('이메일 에러 안 남');
      }
    }

    if (id === 'password') {
      if (!inputValue.password || inputValue.password.length < 8) {
        // newError.password = '비밀번호 8자 입력';
        setError({
          ...error,
          password: '8자 이상 입력해주세요',
        });
      } else {
        setError({
          ...error,
          password: '',
        });
      }
    }

    // setError(newError);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('로그인컴포넌트 버튼 클릭함', inputValue);
    onClickForm(inputValue);
    // handleError(props.id);
    e.preventDefault();
  };

  const contextValue: LoginContextProps = {
    handleInput,
    handleError,
    inputValue,
    error,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      <div className="form-box">
        <form onSubmit={(e) => handleLogin(e)}>
          로그인 폼<div>{children}</div>
          {/* <button type="submit">로그인버튼</button> */}
        </form>
      </div>
    </LoginContext.Provider>
  );
};
