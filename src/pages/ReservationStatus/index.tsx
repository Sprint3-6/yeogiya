import useCalendar from '@/components/Calendar/hooks/useCalendar';
import { isSameDate } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import './style.scss';

export default function ReservationStatus() {
  const { Calendar, selectedDate } = useCalendar();

  return (
    <div className="reservation-status-wrapper">
      <div className="reservation-status-title">예약 현황</div>
      <Calendar
        size="large"
        tileContent={(date: Date) => {
          const statusClass = 'confirmed';
          return (
            <>
              <div className={`calendar-date-box ${isSameDate(selectedDate, date) ? 'selected-date' : ''}`}>
                {format(date, 'd')}
                <div className={`calendar-icon-circle ${statusClass}`} />
              </div>
              <div className="calendar-reservation-wrapper">
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
