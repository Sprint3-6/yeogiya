import Button from '@/components/Button';
import { useContext } from 'react';
import { LoginContext } from '..';

export const UserButtonItem = ({ children }: { children: React.ReactNode }) => {
  const { handleClickForm } = useContext(LoginContext);
  return (
    <Button className="sign-button" onClick={() => handleClickForm()}>
      {children}
    </Button>
  );
};
