import React, { createContext, useEffect, useState } from 'react';
import { InputValue, LoginContextProps, LoginFormProps, errorCheck, errorMessage } from './types';

export const LoginContext = createContext<LoginContextProps>({
  handleInput: () => {},
  handleError: () => {},
  handleClickForm: () => {},
  handleKeyDown: () => {},
  isValid: false,
  inputValue: {},
  error: {},
});

export const UserForm = (props: LoginFormProps) => {
  const { children, onClickForm } = props;
  const [inputValue, setInputValue] = useState<InputValue>(props.value);
  const [requiredValue, setRequiredValue] = useState<InputValue>(props.requiredValue);
  const [error, setError] = useState<InputValue>({});
  const [isErrorCheck, setIsErrorCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const isAllError = Object.values(error).every((value) => value?.trim() === '');
  const isAllInput = Object.values(requiredValue).every((value) => value?.trim() !== '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [id]: value,
    });

    // 필수값일 경우
    if (id in requiredValue) {
      setRequiredValue({
        ...requiredValue,
        [id]: value,
      });
    }

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
    onClickForm(inputValue);
    // 버튼 클릭 후 인풋값 비어주기
    setInputValue({});
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.MutableRefObject<HTMLInputElement | null>,
  ) => {
    const key: string = e.key;
    const currentInput: string = inputRef.current?.id ?? '';

    if (key === 'Enter' || key === 'ArrowLeft' || key === 'ArrowRight') {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.userinput-box input');
      const inputsValue: string[] = Array.from(inputs)
        .filter((input) => !input.disabled)
        .map((input) => input.id);
      const currentIndex: number = inputsValue.findIndex((input: string) => input === currentInput);
      // Enter or 오른쪽 화살표 눌렀을 때
      if (key === 'Enter' || key === 'ArrowRight') {
        if (currentIndex === inputsValue.length - 1) {
          handleClickForm();
        } else {
          const nextIndex = currentIndex + 1;
          const nextValue = inputsValue[nextIndex];
          const currentValue = document.getElementById(nextValue);
          if (currentValue) {
            currentValue.focus();
          }
        }
      }
      // 왼쪽 화살표 눌렀을 때
      if (key === 'ArrowLeft') {
        if (currentIndex === 0) {
          return;
        } else {
          const nextIndex = currentIndex - 1;
          const nextValue = inputsValue[nextIndex];
          const currentValue = document.getElementById(nextValue);
          if (currentValue) {
            currentValue.focus();
          }
        }
      }
    }
  };

  const contextValue: LoginContextProps = {
    handleInput,
    handleError,
    handleClickForm,
    handleKeyDown,
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
