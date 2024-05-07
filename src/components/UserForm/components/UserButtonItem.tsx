import Button from '@/components/Button';
import { useContext } from 'react';
import { LoginContext } from '..';

export const UserButtonItem = ({ children }: { children: React.ReactNode }) => {
  const { handleClickForm, isValid } = useContext(LoginContext);
  return (
    <Button className="sign-button button-black" disabled={!isValid} onClick={() => handleClickForm()}>
      {children}
    </Button>
  );
};
