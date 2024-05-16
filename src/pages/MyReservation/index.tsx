import './style.scss';
import { useState, useEffect, useRef } from 'react';
import { MyReservationType } from '@/api/types/myReservation';
import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import MyReservationCard from './components/MyReservationCard';
import instance from '@/api/instance/defaultInstance';

export default function MyReservation() {
  const [myReservation, setMyReservation] = useState<MyReservationType[]>([]);
  const [statusCategory, setStatusCategory] = useState<DropDownValue>('');
  const cursorIdRef = useRef<number | null>(null);

  const handleClickCategory = (value: DropDownValue) => {
    setStatusCategory(value);
    cursorIdRef.current = null;
    setMyReservation([]);
  };

  const getReservation = async (cursorId: number | null) => {
    try {
      let queryParams = `?size=5`;
      if (statusCategory && statusCategory !== 'all') {
        queryParams += `&status=${statusCategory}`;
      }
      if (cursorId !== null) {
        queryParams += `&cursorId=${cursorId}`;
      }

      const res = await instance.get(`my-reservations${queryParams}`);
      if (cursorId === null) {
        setMyReservation(res.data.reservations);
      } else {
        setMyReservation((prevData) => [...prevData, ...res.data.reservations]);
      }
      if (res.data.reservations.length > 0) {
        cursorIdRef.current = res.data.cursorId;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReservation(null);
  }, [statusCategory]);

  const handleCancelReservation = async (id: number) => {
    try {
      const body = { status: 'canceled' };
      await instance.patch(`my-reservations/${id}`, body);
      setMyReservation((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'canceled' } : reservation,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleIntersection = () => {
    if (cursorIdRef.current !== null) {
      getReservation(cursorIdRef.current);
    }
  };

  const { sentinelRef } = useIntersectionObserver(handleIntersection);

  return (
    <main>
      <div className="my-space-container">
        <div className="my-space-header">
          <h1 className="my-space-title">예약 내역</h1>
          <div className="my-reservation-status-dropdown">
            <DropDown
              id="my-reservation-list"
              title="예약 상태"
              arrowUp={'∧'}
              arrowDown={'∨'}
              onClickItem={handleClickCategory}
            >
              <DropdownItem value="all">전체</DropdownItem>
              <DropdownItem value="pending">예약 완료</DropdownItem>
              <DropdownItem value="canceled">예약 취소</DropdownItem>
              <DropdownItem value="confirmed">예약 승인</DropdownItem>
              <DropdownItem value="declined">예약 거절</DropdownItem>
              <DropdownItem value="completed">이용 완료</DropdownItem>
            </DropDown>
          </div>
        </div>
        <div>
          {myReservation.length > 0 ? (
            <div className="my-space-list-box">
              {myReservation.map((reservation) => (
                <div key={reservation.id}>
                  <MyReservationCard data={reservation} handleCancelReservation={handleCancelReservation} />
                </div>
              ))}
            </div>
          ) : (
            <div className="not-found-file-box">
              <img src="/assets/images/not-found-file.svg" alt="관리할 방이 없습니다" />
              <span>아직 예약한 공간이 없어요</span>
            </div>
          )}
          <div ref={sentinelRef} />
        </div>
      </div>
    </main>
  );
}
