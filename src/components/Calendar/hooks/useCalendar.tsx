import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import CalendarCells from '../components/CalendarCells';
import CalendarHeader from '../components/CalendarHeader';
import '../style.scss';

export default function useCalendar(defaultDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(defaultDate);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  function Calendar({ onChange, onChangeMonth, size, tileContent }: CalendarProps) {
    const nextMonth = () => {
      const newMonth = addMonths(currentMonth, 1);
      setCurrentMonth(newMonth);
      onChangeMonth?.(newMonth);
    };

    const prevMonth = () => {
      const newMonth = subMonths(currentMonth, 1);
      setCurrentMonth(newMonth);
      onChangeMonth?.(newMonth);
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
