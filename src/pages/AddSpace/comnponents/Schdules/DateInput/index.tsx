import { InputHTMLAttributes } from 'react';
import Calendar from '@/components/Calendar';
import { isSameDate } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import { useState } from 'react';
import { Schedule } from '@/api/types/myActivities';
import './style.scss';

interface DateInput extends InputHTMLAttributes<HTMLInputElement> {
  preViewValue: Schedule;
  setPreViewValue: (value: Schedule) => void;
}

export default function DateInput({ preViewValue, setPreViewValue }: DateInput) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const openCalendar = () => {
    setIsOpenCalendar((pre) => !pre);
  };
  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setPreViewValue({ ...preViewValue, date: formattedDate });
  };
  return (
    <div className="calendar-box">
      <label className="calendar-label" htmlFor="date-input">
        <input className="calendar-input" value={preViewValue.date} id="date-input" onClick={openCalendar} />
        <img className="calendar-icon-img" src="/assets/icons/icon-calendar-minimalistic.svg" alt="달력 불러오기" />
      </label>
      {isOpenCalendar && (
        <div className="calendar-popup-box">
          <Calendar
            value={selectedDate} // 선택한 날짜
            onChange={handleDateChange} // 날짜 클릭했을 때 동작하는 핸들러
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
