import { useGetReservedScheduleQuery, useLazyGetTimeReservationsQuery } from '@/api/reservationStatusApi';
import { DropDownValue } from '@/components/Dropdown';
import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';
import { useRef, useState } from 'react';

export default function useReservationInformation(activityId: number, date: Date, reservationChip?: ReservationChip) {
  const [reservations, setReservations] = useState<ReservationMoreInfo[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();
  const [selectedTab, setSelectedTab] = useState<UpdateReservationStatus>(
    reservationChip === 'completed' ? 'pending' : reservationChip ?? 'pending',
  ); // 예약 상태 선택
  const { data: scheduleList } = useGetReservedScheduleQuery({ activityId, date }); // 내 체험 날짜별 예약 정보 조회 엔드포인트
  const [getTimeReservations, { data, originalArgs }] = useLazyGetTimeReservationsQuery(); // 내 체험 예약 시간대별 예약 내역 조회
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { totalCount } = (originalArgs?.status === selectedTab && data) || {
    totalCount: 0,
  };

  const handleTabClick = (tab: UpdateReservationStatus) => {
    setReservations([]);
    setSelectedScheduleId(undefined);
    setSelectedTab(tab);
  };

  const loadMore = async (length = totalCount) => {
    if (reservations.length === length) return;
    const { data } = await getTimeReservations({
      activityId,
      cursorId: reservations[reservations.length - 1]?.id,
      scheduleId: selectedScheduleId!,
      status: selectedTab,
    });
    if (data) {
      setReservations([...reservations, ...data.reservations]);
    }
  };

  const onClickTimeItem = async (scheduleId: DropDownValue) => {
    scrollToTop();
    setSelectedScheduleId(scheduleId as number);
    const { data } = await getTimeReservations({
      activityId,
      scheduleId: scheduleId as number,
      status: selectedTab,
    });
    setReservations(data?.reservations ?? []);
  };

  const scrollToTop = () => {
    const container = boxRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  };

  const { sentinelRef } = useIntersectionObserver(loadMore, { root: containerRef.current });

  return {
    boxRef,
    containerRef,
    handleTabClick,
    onClickTimeItem,
    reservations,
    scheduleList,
    scrollToTop,
    selectedScheduleId,
    selectedTab,
    sentinelRef,
    totalCount,
  };
}
