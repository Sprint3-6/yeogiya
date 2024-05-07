import { Schedule } from '@/api/types/myActivities';
import useCalendar from '@/components/Calendar/hooks/useCalendar';
import { isSameDate } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import './style.scss';

interface DateInput extends InputHTMLAttributes<HTMLInputElement> {
  preViewValue: Schedule;
  setPreViewValue: (value: Schedule) => void;
}

export default function DateInput({ preViewValue, setPreViewValue }: DateInput) {
  const { Calendar, selectedDate, setSelectedDate } = useCalendar();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const openCalendar = () => {
    setIsOpenCalendar((pre) => !pre);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node) &&
      !labelRef.current?.contains(event.target as Node)
    ) {
      setIsOpenCalendar(false);
    }
  };
  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setPreViewValue({ ...preViewValue, date: formattedDate });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPreViewValue({ ...preViewValue, date: value });
  };
  const handleMonthChange = (month: Date) => {
    console.debug('Month changed:', month.getFullYear(), month.getMonth() + 1);
  };
  return (
    <div className="calendar-box">
      <div className="calendar-input-title">날짜</div>
      <label ref={labelRef} className="calendar-label" htmlFor="date-input">
        <input
          className="calendar-input"
          value={preViewValue.date}
          onChange={handleInputChange}
          id="date-input"
          onClick={openCalendar}
          placeholder="YY/MM/DD"
        />
        <img className="calendar-icon-img" src="/assets/icons/icon-calendar-minimalistic.svg" alt="달력 불러오기" />
      </label>
      {isOpenCalendar && (
        <div className="calendar-popup-box" ref={calendarRef}>
          <Calendar
            onChange={handleDateChange} // 날짜 클릭했을 때 동작하는 핸들러
            onChangeMonth={handleMonthChange}
            size="small" // 여러분들이 쓰실 사이즈는 스몰입니다
            tileContent={(date: Date) => {
              // 날짜 셀입니다. 그냥 복붙해주시면 됩니다.
              return (
                <div
                  className={`calendar-date-box ${isSameDate(selectedDate, date) ? 'selected-date' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {format(date, 'd')}
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
