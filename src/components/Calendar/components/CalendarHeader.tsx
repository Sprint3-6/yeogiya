import './calendarHeader.scss';
import { format } from 'date-fns';

export default function CalendarHeader({
  size = 'large',
  currentMonth = new Date(),
  prevMonth,
  nextMonth,
}: CalendarHeaderProps) {
  return (
    <div className={`calendar-header-wrapper ${size}`}>
      <button onClick={prevMonth} type="button" className="calendar-header-button previous-button">
        <img src="/public/assets/icons/icon-left.svg" alt="이전 달" className="calendar-header-icon left-icon" />
      </button>
      <div className="selected-month">{format(currentMonth, 'yyyy년 M월')}</div>
      <button onClick={nextMonth} type="button" className="calendar-header-button next-button">
        <img src="/public/assets/icons/icon-right.svg" alt="다음 달" className="calendar-header-icon right-icon" />
      </button>
    </div>
  );
}
