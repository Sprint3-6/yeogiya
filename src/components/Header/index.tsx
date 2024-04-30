import './style.scss';
import { Link } from 'react-router-dom';
import HeaderButtons from './components/HeaderButtons';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src="/assets/logos/logo-small.svg" alt="로고이미지" className="header-logo" />
      </Link>
      <HeaderButtons />
    </header>
  );
}
