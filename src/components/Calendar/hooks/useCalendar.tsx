import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import CalendarCells from '../components/CalendarCells';
import CalendarHeader from '../components/CalendarHeader';
import '../style.scss';

export default function useCalendar(currentDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  function Calendar({ onChange, onChangeMonth, size, tileContent }: CalendarProps) {
    const nextMonth = () => {
      setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
      onChangeMonth?.(currentMonth);
    };

    const prevMonth = () => {
      setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
      onChangeMonth?.(currentMonth);
    };

    return (
      <div className={`calendar-wrapper ${size === 'small' ? 'calendar-small' : 'calendar-large'}`}>
        <CalendarHeader currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} size={size} />
        <CalendarCells currentMonth={currentMonth} onChange={onChange} tileContent={tileContent} size={size} />
      </div>
    );
  }
  return { Calendar, currentMonth, handleDateClick, selectedDate, setSelectedDate };
}
