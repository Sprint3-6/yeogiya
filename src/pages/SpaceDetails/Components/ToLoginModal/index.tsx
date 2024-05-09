import { useLocation, useNavigate } from 'react-router-dom';
import { ToLoginModalType } from '../../Types/DetailTypes';
import Button from '@/components/Button';
import './style.scss';

const ToLoginModal = ({ closeModal }: ToLoginModalType) => {
  const navigate = useNavigate();
  const location = useLocation();

  const toLoginPage = () => {
    navigate('/sign-in', { state: { from: location.pathname } });
  };

  return (
    <div className="to-login-container">
      <h1>로그인이 필요한 서비스 입니다.</h1>
      <div>
        <Button onClick={toLoginPage} className="button-black">
          로그인
        </Button>
        <Button onClick={closeModal} className="button-white">
          닫기
        </Button>
      </div>
    </div>
  );
};

export default ToLoginModal;
