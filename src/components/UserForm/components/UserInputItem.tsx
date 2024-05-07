import { useContext, useRef, useState } from 'react';
import { LoginContext } from '@/components/UserForm';
import '../style.scss';
import { LoginItem } from '../types';

export const UserInputItem = ({ children, id, type, text, ...props }: LoginItem) => {
  const { handleInput, handleError, handleKeyDown, inputValue, error } = useContext(LoginContext);

  const [isType, setIsType] = useState(type);
  const noEyeImage = '/assets/icons/icon-eye-no.svg';
  const eyeImage = '/assets/icons/icon-eye.svg';

  const [isPassword, setIsPassword] = useState(true);
  const [isEye, setIsEye] = useState(noEyeImage);
  const inputRef = useRef(null);

  const handleIsPassword = () => {
    setIsPassword(!isPassword);
    if (isPassword) {
      setIsType('string');
      setIsEye(eyeImage);
    } else {
      setIsType('password');
      setIsEye(noEyeImage);
    }
  };

  return (
    <div className={`userinput-container ${error[id as keyof typeof error] ? 'error' : ''}`}>
      <label htmlFor={id} className="userinput-label">
        {children}
        <div className="userinput-box">
          <input
            id={id}
            type={isType}
            value={inputValue[id as keyof typeof inputValue] || ''}
            placeholder={text}
            onChange={(e) => handleInput(e)}
            onBlur={(e) => handleError(e)}
            onKeyDown={(e) => handleKeyDown(e, inputRef)}
            ref={inputRef}
            {...props}
          />
          {type === 'password' ? <img src={isEye} alt="비밀번호 표시" onClick={() => handleIsPassword()} /> : null}
        </div>
      </label>
      {error[id as keyof typeof error] ? (
        <div className="userinput-error">{error[id as keyof typeof error]}</div>
      ) : null}
    </div>
  );
};
