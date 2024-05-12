import { useGetActivityListQuery, useLazyGetReservationDashboardQuery } from '@/api/reservationStatusApi';
import CalendarReservationChip from '@/components/Calendar/components/CalendarReservationChip';
import useCalendar from '@/components/Calendar/hooks/useCalendar';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import { useModal } from '@/hooks/useModal/useModal';
import ReservationInformation from '@/pages/ReservationStatus/components/ReservationInformation';
import { isSameDate, statusChips, statusMap, translateMap } from '@/utils/calendarUtils';
import { format, getYear } from 'date-fns';
import { useEffect, useState } from 'react';
import ErrorModal from '../ErrorModal';
import Loading from '../Loading';
import './style.scss';

export default function ReservationStatus() {
  const { Calendar, selectedDate, setSelectedDate } = useCalendar();
  const { data: myActivities, ...myActivitiesQuery } = useGetActivityListQuery(); // 내 체험 리스트 조회
  const [activityId, setActivityId] = useState<number>(); // 체험명 선택
  const [selectedChip, setSelectedChip] = useState<ReservationChip>('pending'); // 예약 상태 선택
  const [getReservationDashboard, { data: myDashboard, ...myDashboardQuery }] = useLazyGetReservationDashboardQuery();
  const { Modal, openModal, closeModal } = useModal();
  const [selectedActivity, setSelectedActivity] = useState<string>();

  const isError = myActivitiesQuery.isError || myDashboardQuery.isError;
  const isLoading =
    myActivitiesQuery.isFetching ||
    myActivitiesQuery.isLoading ||
    myDashboardQuery.isFetching ||
    myDashboardQuery.isLoading;

  const handleTagClick = (date: Date, chip: ReservationChip) => {
    setSelectedDate(date);
    setSelectedChip(chip);
    if (chip === 'pending' || chip === 'confirmed') {
      openModal('reservation');
    }
  };

  const onClickItem = (value: DropDownValue) => {
    myActivities?.activities.forEach((activity) => {
      if (activity.title === value) {
        setActivityId(activity.id);
        setSelectedActivity(value);
      }
    }, []);
  };

  useEffect(() => {
    if (activityId) {
      getReservationDashboard({
        activityId,
        year: getYear(selectedDate),
        month: format(selectedDate, 'MM'),
      });
    }
  }, [activityId]);

  useEffect(() => {
    if (isError) openModal('error');
  }, [isError]);

  if (isLoading) return <Loading type="loading-screen" />;
  if (isError) {
    return (
      <Modal name="error">
        <ErrorModal onClose={closeModal} />
      </Modal>
    );
  }

  return (
    <div className="reservation-status-wrapper">
      <div className="reservation-status-title">예약 현황</div>
      {myActivities?.activities.length === 0 ? (
        <div className="not-found-reservation-file-box">
          <img src="/assets/images/not-found-file.svg" alt="아직 등록된 예약이 없을 때 뜨는 이미지" />
          <div className="not-reservation-title">아직 등록된 예약이 없어요</div>
        </div>
      ) : (
        <>
          <div className="reservation-status-dropdown-box">
            <div className="reservation-status-dropdown-title">체험명</div>
            {/* 내 체험 리스트 조회 */}
            <DropDown
              id="activityNames"
              title={selectedActivity || '체험을 선택해주세요.'}
              arrowUp={'∧'}
              arrowDown={'∨'}
              onClickItem={onClickItem}
            >
              {myActivities?.activities.map((activity) => (
                <DropdownItem key={activity.id} value={activity.title}>
                  {activity.title}
                </DropdownItem>
              ))}
            </DropDown>
          </div>
          {/* 내 체험 월별 예약 현황 조회 */}
          <Calendar
            size="large"
            tileContent={(date: Date) => {
              const reservation = myDashboard?.find((r) => r.date === format(date, 'yyyy-MM-dd'));
              const reservations = reservation?.reservations ?? { pending: 0, confirmed: 0, completed: 0 };

              let statusClass = '';

              if (reservations.pending > 0) {
                statusClass = 'pending';
              } else if (reservations.confirmed > 0) {
                statusClass = 'confirmed';
              } else if (reservations.completed > 0) {
                statusClass = 'completed';
              }

              return (
                <>
                  <div className={`calendar-date-box ${isSameDate(selectedDate, date) ? 'selected-date' : ''}`}>
                    {format(date, 'd')}
                    <div className={`calendar-icon-circle ${statusClass}`} />
                  </div>
                  <div className="calendar-reservation-wrapper">
                    {statusChips.map(
                      (chip, index) =>
                        (reservations[chip] ?? 0) !== 0 && (
                          <CalendarReservationChip
                            key={chip + '-' + index}
                            status={`${translateMap[chip]} ${reservations[chip]}`}
                            color={statusMap[chip] + '-chip'}
                            onClick={() => handleTagClick(date, chip)}
                          />
                        ),
                    )}
                  </div>
                </>
              );
            }}
          />
          {/* 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */}
          {/* 내 체험 예약 시간대별 예약 내역 조회 */}
          {/* 내 체험 예약 상태(승인, 거절) 업데이트 */}
          <Modal name="reservation">
            {activityId && (
              <ReservationInformation
                activityId={activityId}
                reservationChip={selectedChip}
                selectedDate={selectedDate}
              />
            )}
          </Modal>
        </>
      )}
    </div>
  );
}
