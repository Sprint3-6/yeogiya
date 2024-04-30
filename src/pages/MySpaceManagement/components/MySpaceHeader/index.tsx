import Button from '@/components/Button';
import './style.scss';
import { Link } from 'react-router-dom';

export default function MySpaceHeader() {
  return (
    <div className="my-space-header">
      <h2>내 공간 관리</h2>
      <Link to="add">
        <Button className="my-space-header-button button-black">공간 등록하기</Button>
      </Link>
    </div>
  );
}
