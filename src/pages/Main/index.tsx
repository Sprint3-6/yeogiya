import { Link } from 'react-router-dom';
import './style.scss';
import { useState, useEffect } from 'react';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';
import { Category, Spaces } from './types/spaces-type';
import SpaceCardList from './components/SpaceCardList';
import Pagination from '@/components/Pagination';
interface DataType {
  activities: Spaces[];
  totalCount: number;
}

//api 호출은 위에서?

export default function MainPage() {
  const [data, setData] = useState<DataType | null>(null);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>('');
  const [sortedSpaces, setSortedSpaces] = useState('');

  const handleClickCategory = (name: Category) => {
    setSelectedCategory((prev) => (prev === name ? '' : name));
  };

  const handleSortSpaces = (value: string) => {
    if (value === '') {
      return;
    } else if (value === 'high') {
      setSortedSpaces('price_desc');
    } else if (value === 'row') {
      setSortedSpaces('price_asc');
    }
  };

  useEffect(() => {
    const getSpaces = async () => {
      try {
        let url = `${BASE_URL}activities?method=offset&page=${page}&size=10`;
        // selectedCategory가 빈 문자열이 아닌 경우에만 카테고리 쿼리 파라미터를 추가
        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }
        if (sortedSpaces) {
          url += `&sort=${sortedSpaces}`;
        }

        const res = await instance.get(url);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSpaces();
  }, [page, selectedCategory, sortedSpaces]);

  return (
    <main>
      메인페이지 입니다.
      <br />
      <Link to={'sign-in'}>로그인</Link>
      <br />
      <Link to={'sign-up'}>회원가입</Link>
      <br />
      <Link to={'mypage'}>내정보</Link>
      <br />
      <Link to={'mypage/reservation'}>예약내역</Link>
      <br />
      <Link to={'mypage/admin/status'}>예약현황</Link>
      <br />
      <Link to={'mypage/admin'}>내 공간 관리</Link>
      <br />
      <Link to={'space/735'}>공간상세(내꺼)</Link>
      <br />
      <Link to={'space/704'}>공간상세(내꺼아님)</Link>
      {data?.activities && (
        <SpaceCardList
          spaces={data.activities}
          handleClickCategory={handleClickCategory}
          handleSortSpaces={handleSortSpaces}
        />
      )}
      <Pagination totalCount={data?.totalCount} size={10} page={page} setPage={setPage} />
    </main>
  );
}
