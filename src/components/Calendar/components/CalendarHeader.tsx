import { format } from 'date-fns';
import { useMemo } from 'react';
import './calendarHeader.scss';

export default function CalendarHeader({
  size = 'large',
  currentMonth = new Date(),
  prevMonth,
  nextMonth,
}: CalendarHeaderProps) {
  const formattedMonth = useMemo(() => format(currentMonth, 'yyyy년 MM월'), [currentMonth]);

  return (
    <div className={`calendar-header-wrapper ${size}`}>
      <button onClick={prevMonth} type="button" className="calendar-header-button previous-button">
        <img src="/assets/icons/icon-left.svg" alt="이전 달" className="calendar-header-icon left-icon" />
      </button>
      <div className="selected-month">{formattedMonth}</div>
      <button onClick={nextMonth} type="button" className="calendar-header-button next-button">
        <img src="/assets/icons/icon-right.svg" alt="다음 달" className="calendar-header-icon right-icon" />
      </button>
    </div>
  );
}
