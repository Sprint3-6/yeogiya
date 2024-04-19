import { useParams } from 'react-router-dom';

import './style.scss';

export default function ActivityDetails() {
  const { id } = useParams();

  return <main>{id}번 체험상세 페이지 입니다.</main>;
}
