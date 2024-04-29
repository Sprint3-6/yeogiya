import Button from '@/components/Button';

export const UserButtonItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button className="user-button" type="submit">
      {children}
    </Button>
  );
};
