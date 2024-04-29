import { useContext } from 'react';
import { LoginContext } from '@/components/UserForm';
import '../style.scss';

interface LoginItem {
  children: React.ReactNode;
  id: string;
  type: string;
  text: string;
}

export const UserInputItem = ({ children, id, type, text }: LoginItem) => {
  const { handleInput, handleError, inputValue, error } = useContext(LoginContext);

  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {children}
        <div className="userinput-box">
          <input
            id={id}
            type={type}
            value={inputValue[id as keyof typeof inputValue]}
            placeholder={text}
            onChange={(e) => handleInput(e)}
            onBlur={() => handleError(id)}
          />
          {type === 'password' ? <div>눈</div> : null}
        </div>
      </label>
      {error[id as keyof typeof error] ? <div className="error">{error[id as keyof typeof error]}</div> : null}
    </div>
  );
};
