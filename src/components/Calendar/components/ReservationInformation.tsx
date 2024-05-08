import {
  useGetReservedScheduleQuery,
  useLazyGetTimeReservationsQuery,
  useUpdateReservationStatusMutation,
} from '@/api/reservationStatusApi';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import { useModal } from '@/hooks/useModal/useModal';
import ErrorModal from '@/pages/ErrorModal';
import { translateMap } from '@/utils/calendarUtils';
import toast from '@/utils/toast';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Button from '../../Button';
import './reservationInformation.scss';

export default function ReservationInformation({ chip, selectedDate, activityId }: ReservationInformationProps) {
  const [selectedTab, setSelectedTab] = useState<UpdateReservationStatus>(
    chip === 'completed' ? 'pending' : chip ?? 'pending',
  ); // 예약 상태 선택
  const { data: scheduleList } = useGetReservedScheduleQuery({ activityId, date: selectedDate }); // 내 체험 날짜별 예약 정보 조회 엔드포인트
  const [getTimeReservations, { data, originalArgs }] = useLazyGetTimeReservationsQuery(); // 내 체험 예약 시간대별 예약 내역 조회
  const { reservations, totalCount } = (originalArgs?.status === selectedTab && data) || {
    reservations: [] as ReservationMoreInfo[],
    totalCount: 0,
  };

  const handleTabClick = (tab: UpdateReservationStatus) => {
    setSelectedTab(tab);
  };

  const onClickTimeItem = (scheduleId: DropDownValue) => {
    getTimeReservations({
      activityId,
      scheduleId: scheduleId as number,
      status: selectedTab,
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  };

  return (
    <div className="reservation-information-wrapper">
      <div className="reservation-information-title">예약 정보</div>
      <div className="reservation-information-box">
        <div className="reservation-information-tab">
          <div
            className={`reservation-information-tab-item ${selectedTab === 'pending' ? 'active' : ''}`}
            onClick={() => handleTabClick('pending')}
          >
            신청
          </div>
          <div
            className={`reservation-information-tab-item ${selectedTab === 'confirmed' ? 'active' : ''}`}
            onClick={() => handleTabClick('confirmed')}
          >
            승인
          </div>
          <div
            className={`reservation-information-tab-item ${selectedTab === 'declined' ? 'active' : ''}`}
            onClick={() => handleTabClick('declined')}
          >
            거절
          </div>
        </div>
        <div className="reservation-information-content-container">
          <div className="reservation-information-content-title-box">
            <div className="reservation-information-content-item">예약 날짜</div>
            <div className="reservation-information-content-title-content">{format(selectedDate, 'yyyy.MM.dd.')}</div>
          </div>
          {/* 예약 시간 조회 */}
          <div className="reservation-time-dropdown-box">
            <DropDown
              id="reservedTime"
              title="시간을 선택하세요"
              arrowUp={'∧'}
              arrowDown={'∨'}
              onClickItem={onClickTimeItem}
            >
              {scheduleList
                ?.filter((schedule) => schedule.count[selectedTab] > 0)
                .map((schedule) => (
                  <DropdownItem key={`${selectedTab}-${schedule.scheduleId}`} value={schedule.scheduleId}>
                    {schedule.startTime + ' ~ ' + schedule.endTime + ' / ' + schedule.count[selectedTab] + '건'}
                  </DropdownItem>
                ))}
            </DropDown>
          </div>
          <div className="reservation-information-content-item">예약 내역</div>
          {reservations.length === 0 ? (
            '예약 내역이 없습니다.'
          ) : (
            <div className="reservation-information-list-box" ref={containerRef}>
              {reservations.map((reservation) => (
                <History
                  activityId={activityId}
                  key={reservation.id}
                  reservation={reservation}
                  selectedTab={selectedTab}
                />
              ))}
              <div className="reservation-information-top" onClick={scrollToTop}>
                <img src="/assets/icons/icon-top.gif" alt="위로 가기" />
              </div>
              {totalCount > 1 && <div className="shadow-box"></div>}
            </div>
          )}
        </div>
      </div>
      <div className="reservation-information-content-reservation-status">
        <div className="reservation-information-content-item">예약 현황</div>
        <div className="reservation-information-content-item">
          {totalCount}건 / {scheduleList?.reduce((prev, cur) => prev + cur.count[selectedTab], 0)}건
        </div>
      </div>
    </div>
  );
}

function History({ activityId, reservation, selectedTab }: HistoryProps) {
  const { Modal, openModal, closeModal } = useModal();
  const [updateReservationStatus, { isError }] = useUpdateReservationStatusMutation();

  useEffect(() => {
    if (isError) openModal('error');
  }, [isError]);

  if (isError) {
    return (
      <Modal name="error">
        <ErrorModal onClose={closeModal} />
      </Modal>
    );
  }

  const handleApproveClick = async (reservationId: number) => {
    await updateReservationStatus({ activityId, reservationId, status: 'confirmed' });
    toast.success('예약을 승인했습니다.');
  };

  const handleRejectClick = async (reservationId: number) => {
    await updateReservationStatus({ activityId, reservationId, status: 'declined' });
    toast.error('예약을 거절했습니다.');
  };

  return (
    <div className="reservation-information-content-booking-history">
      <div className="reservation-information-content-booking-history-content">
        <div className="reservation-information-content-booking-history-item">닉네임</div>
        <div className="reservation-information-content-booking-history-item-content">{reservation.nickname}</div>
      </div>
      <div className="reservation-information-content-booking-history-content">
        <div className="reservation-information-content-booking-history-item">인원</div>
        <div className="reservation-information-content-booking-history-item-content">{reservation.headCount}</div>
      </div>
      {selectedTab === 'pending' ? (
        <div className="reservation-information-content-booking-history-buttons">
          <Button
            type="button"
            className="button-black button-booking-approve"
            onClick={() => handleApproveClick(reservation.id)}
          >
            승인하기
          </Button>
          <Button
            type="button"
            className="button-white button-booking-reject"
            onClick={() => handleRejectClick(reservation.id)}
          >
            거절하기
          </Button>
        </div>
      ) : (
        <div className={`reservation-information-chip-wrapper ${selectedTab}`}>예약 {translateMap[selectedTab]}</div>
      )}
    </div>
  );
}
