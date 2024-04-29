import { Link } from 'react-router-dom';
import './style.scss';

export const SignLogo = () => {
  return (
    <div className="Logo">
      <Link to="/">
        <img src="/assets/logos/logo-big.svg" alt="메인 이동" />
      </Link>
    </div>
  );
};
