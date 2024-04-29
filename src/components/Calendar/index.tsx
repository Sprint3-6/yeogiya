import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import CalendarCells from './components/CalendarCells';
import CalendarHeader from './components/CalendarHeader';
import './style.scss';

export default function Calendar({ onChange, size, tileContent, value = new Date() }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(value);

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  return (
    <div className={`calendar-wrapper ${size === 'small' ? 'calendar-small' : 'calendar-large'}`}>
      <CalendarHeader currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} size={size} />
      <CalendarCells currentMonth={currentMonth} onChange={onChange} tileContent={tileContent} size={size} />
    </div>
  );
}
