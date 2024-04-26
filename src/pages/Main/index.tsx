import { Link } from 'react-router-dom';
import './style.scss';
import { useState, useEffect } from 'react';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';
import { Spaces } from './types/spaces-type';
import SpaceCardList from './components/SpaceCardList';
import Pagination from '@/components/Pagination';
interface DataType {
  activities: Spaces[];
  totalCount: number;
}

export default function MainPage() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const res = await instance.get(`${BASE_URL}activities?method=offset`);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSpaces();
  }, []);

  return (
    <main>
      <h1>메인 페이지</h1>
      <nav>
        <Link to="sign-in">로그인</Link>
        <br />
        <Link to="sign-up">회원가입</Link>
        <br />
        <Link to="mypage">내정보</Link>
        <br />
        <Link to="mypage/reservation">예약내역</Link>
        <br />
        <Link to="mypage/admin/status">예약현황</Link>
        <br />
        <Link to="mypage/admin">내 공간 관리</Link>
        <br />
        <Link to="space/718">공간 상세</Link>
      </nav>

      {data?.activities && <SpaceCardList spaces={data.activities} />}

      <Pagination totalCount={data?.totalCount} size={6} />
    </main>
  );
}
