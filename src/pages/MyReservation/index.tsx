import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import MyReservationCard from './components/MyReservationCard';
import { useState, useEffect } from 'react';
import { MyReservationType } from '@/api/types/myReservation';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';

/**
TODO 체험완료 문구 변경
TODO 무한스크롤 추가
*/

export default function MyReservation() {
  const [myReservation, setMyReservation] = useState<MyReservationType[]>([]);
  const [statusCategory, setStatusCategory] = useState<DropDownValue>('');

  const handleClickCategory = (value: DropDownValue) => {
    setStatusCategory(value);
  };

  useEffect(() => {
    const getReservation = async () => {
      try {
        // statusCategory에 따라 쿼리 파라미터를 설정
        let queryParams = '';
        if (statusCategory && statusCategory !== 'all') {
          queryParams = `?size=10&status=${statusCategory}`;
        }

        const res = await instance.get(`${BASE_URL}my-reservations${queryParams}`);
        setMyReservation(res.data.reservations);
        console.log(myReservation);
      } catch (err) {
        console.error(err);
      }
    };
    getReservation();
  }, [statusCategory]);

  const handleCancelReservation = async (id: number) => {
    try {
      const body = {
        status: 'canceled',
      };
      const res = await instance.patch(`${BASE_URL}my-reservations/${id}`, body);
      console.log(res.data);

      setMyReservation((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'canceled' } : reservation,
        ),
      );
      //성공 시 토스트, 실행 전 모달
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-reservation-container">
      <h1>예약 내역</h1>
      <DropDown id="my-reservation-list" title="예약 상태" onClickItem={handleClickCategory}>
        <DropdownItem value="all">전체</DropdownItem>
        <DropdownItem value="pending">예약 완료</DropdownItem>
        <DropdownItem value="canceled">예약 취소</DropdownItem>
        <DropdownItem value="confirmed">예약 승인</DropdownItem>
        <DropdownItem value="declined">예약 거절</DropdownItem>
        <DropdownItem value="completed">이용 완료</DropdownItem>
      </DropDown>

      {myReservation.map((reservation) => (
        <MyReservationCard key={reservation.id} data={reservation} handleCancelReservation={handleCancelReservation} />
      ))}
    </div>
  );
}
