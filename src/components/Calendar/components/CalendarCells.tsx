import generateDates from '@/utils/calendarUtils';
import './calendarCells.scss';

export default function CalendarCells({ currentMonth, onChange, size = 'large', tileContent }: CalendarCellsProps) {
  const today = new Date();
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = generateDates(currentMonth);

  const isSameDate = (selectedDate: Date, date?: Date) => {
    return (
      date?.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className={`calendar-days-wrapper ${size}`}>
      {weekdays.map((weekday, index) => (
        <div key={index} className="calendar-weekday">
          {weekday}
        </div>
      ))}
      {dates.map(({ date }, index) => (
        <div
          key={index + weekdays.length}
          className={`calendar-date ${isSameDate(today, date) ? 'today' : ''}`}
          onClick={() => date && onChange?.(date)}
        >
          {date && tileContent(date)}
        </div>
      ))}
    </div>
  );
}
