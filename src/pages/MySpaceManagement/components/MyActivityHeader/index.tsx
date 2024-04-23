import Button from '../../../../components/Button';
import './MyActivityHeader.scss';

export default function MyActivityHeader() {
  return (
    <div className="my-activity-header">
      <h2>내 체험 관리</h2>
      <Button className="my-activity-header-button">체험 등록하기</Button>
    </div>
  );
}
