import { useParams } from 'react-router-dom';

import toast from '../../utils/toast';

export default function ActivityDetails() {
  const { id } = useParams();

  return (
    <main>
      {id}번 체험상세 페이지 입니다.
      <br />
      <button onClick={() => toast.success('성공 토스트 입니다.')}>성공토스트</button>
      <br />
      <button onClick={() => toast.warning('경고 토스트 입니다.')}>경고토스트</button>
      <br />
      <button onClick={() => toast.error('에러 토스트 입니다.')}>에러토스트</button>
    </main>
  );
}
