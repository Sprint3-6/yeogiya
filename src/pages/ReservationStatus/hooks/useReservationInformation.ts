import { useGetReservedScheduleQuery, useLazyGetTimeReservationsQuery } from '@/api/reservationStatusApi';
import { DropDownValue } from '@/components/Dropdown';
import { useRef, useState } from 'react';

export default function useReservationInformation(activityId: number, date: Date, reservationChip?: ReservationChip) {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();
  const [selectedTab, setSelectedTab] = useState<UpdateReservationStatus>(
    reservationChip === 'completed' ? 'pending' : reservationChip ?? 'pending',
  ); // 예약 상태 선택
  const { data: scheduleList } = useGetReservedScheduleQuery({ activityId, date }); // 내 체험 날짜별 예약 정보 조회 엔드포인트
  const [getTimeReservations, { data, originalArgs }] = useLazyGetTimeReservationsQuery(); // 내 체험 예약 시간대별 예약 내역 조회
  const { reservations, totalCount } = (originalArgs?.status === selectedTab && data) || {
    reservations: [] as ReservationMoreInfo[],
    totalCount: 0,
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: UpdateReservationStatus) => {
    setSelectedScheduleId(undefined);
    setSelectedTab(tab);
  };

  const onClickTimeItem = (scheduleId: DropDownValue) => {
    setSelectedScheduleId(scheduleId as number);
    getTimeReservations({
      activityId,
      scheduleId: scheduleId as number,
      status: selectedTab,
    });
  };

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  };

  return {
    containerRef,
    handleTabClick,
    onClickTimeItem,
    reservations,
    scheduleList,
    scrollToTop,
    selectedScheduleId,
    selectedTab,
    totalCount,
  };
}
