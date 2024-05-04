import { createContext, useEffect, useState } from 'react';
import { InputValue, LoginContextProps, LoginFormProps, errorCheck, errorMessage } from './types';

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

  const isAllError = Object.values(error).every((value) => value.trim() === '');
  const isAllInput = Object.values(inputValue).every((value) => value.trim() !== '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [id]: value,
    });

    if (isErrorCheck) {
      handleError(e);
    }
  };

  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errorCheck: errorCheck = {
      email: !value || !emailCheck.test(value),
      nickname: !value || value?.length < 2,
      password: !value || value?.length < 8,
      passwordCheck: inputValue.password !== value,
    };

    const errorMessage: errorMessage = {
      email: '잘못된 이메일입니다.',
      nickname: '닉네임을 입력해주세요',
      password: '8자 이상 입력해주세요',
      passwordCheck: '비밀번호가 일치하지 않습니다',
    };

    setIsErrorCheck(true);

    if (id) {
      setError((prevError) => ({
        ...prevError,
        [id]: errorCheck[id] ? errorMessage[id] : '',
      }));
    }
  };

  const handleClickForm = () => {
    console.log('로그인컴포넌트 버튼 클릭함', inputValue);
    onClickForm(inputValue);
  };

  const contextValue: LoginContextProps = {
    handleInput,
    handleError,
    handleClickForm,
    isValid,
    inputValue,
    error,
  };

  useEffect(() => {
    setIsValid(isAllInput && isAllError);
  }, [isAllError, isAllInput]);

  return (
    <LoginContext.Provider value={contextValue}>
      <div className="userform-box">
        <form>
          <div>{children}</div>
        </form>
      </div>
    </LoginContext.Provider>
  );
};
