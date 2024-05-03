import { createContext, useEffect, useState } from 'react';

export interface InputValue {
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
  handleClickForm: () => void;
  isValid: boolean;
  inputValue: InputValue;
  error: InputValue;
}

export const LoginContext = createContext<LoginContextProps>({
  handleInput: () => {},
  handleError: () => {},
  handleClickForm: () => {},
  isValid: false,
  inputValue: {},
  error: {},
});

export const UserForm = (props: LoginFormProps) => {
  const { children, onClickForm } = props;
  const [inputValue, setInputValue] = useState<InputValue>(props.value);
  const [error, setError] = useState<InputValue>({});
  const [isErrorCheck, setIsErrorCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log('로그인버튼활성화', isValid);
  }, [inputValue.email, inputValue.password, error.email, error.password]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [id]: value,
    });
    console.log('로그인폼 컴포넌트 아이디', id);
    console.log('로그인폼 컴포넌트 값', inputValue);

    if (isErrorCheck) {
      handleError(id);
    }
  };

  // const errorArray = Object.entries(newError).map(([_, value]) => value);
  // console.log('에러배열', errorArray);
  // if (ee) {
  //   console.log('모두 투루다', ee);
  // } else {
  //   console.log('에러가 있다');
  // }
  // setIsButton(nowError);

  // setIsButton = newError.map((e) => Boolean(e) === false);

  // console.log('뉴에러불린반대값', isButton);
  // !newError && setIsButton(!isButton);

  const handleError = (id: string) => {
    setIsErrorCheck(true);
    console.log('에러 검사', error);
    console.log('에러검사할 아이디', id);

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (id === 'email') {
      setError((prevError) => ({
        ...prevError,
        email: !inputValue.email || !emailCheck.test(inputValue.email) ? '잘못된 이메일입니다.' : '',
      }));
    }

    if (id == 'nickname') {
      setError((prevError) => ({
        ...prevError,
        nickname: !inputValue.nickname || inputValue.nickname?.length < 2 ? '닉네임을 입력해주세요' : '',
      }));
    }

    if (id === 'password') {
      setError((prevError) => ({
        ...prevError,
        password: !inputValue.password || inputValue.password?.length < 8 ? '8자 이상 입력해주세요' : '',
      }));
    }

    if (id === 'passwordCheck') {
      setError((prevError) => ({
        ...prevError,
        passwordCheck: inputValue.passwordCheck !== inputValue.password ? '비밀번호가 일치하지 않습니다' : '',
      }));
    }

    const isAllError = Object.values(error).every((value) => value.trim() === '');
    const isAllInput = Object.values(inputValue).every((value) => value.trim() !== '');

    setIsValid(isAllInput && isAllError);
    console.log('에러', isAllError);
    console.log('입력', isAllInput);
    console.log('둘다', isAllInput && isAllError);

    // setError(newError);
  };

  const handleClickForm = () => {
    console.log('로그인컴포넌트 버튼 클릭함', inputValue);
    onClickForm(inputValue);
    // handleError(props.id);
    // e.preventDefault();
  };

  const contextValue: LoginContextProps = {
    handleInput,
    handleError,
    handleClickForm,
    isValid,
    inputValue,
    error,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      <div className="userform-box">
        {/* <form onSubmit={(e) => handleClickForm(e)}> */}
        <form>
          <div>{children}</div>
        </form>
      </div>
    </LoginContext.Provider>
  );
};
