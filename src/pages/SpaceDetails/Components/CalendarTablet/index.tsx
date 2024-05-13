import { useEffect } from 'react';
import { isSameDate } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import { ScheduleType } from '../../Types/DetailTypes';
import Button from '@/components/Button';
import useCalendar from '@/components/Calendar/hooks/useCalendar';

interface Temp {
  closeModal: () => void;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDateString: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleMonthChange: (month: Date) => void;
  schedule: ScheduleType[] | undefined;
  selectedSchedule: number | null;
  handleSelectedSchedule: (id: number) => void;
  setOpenedSchedule: () => Promise<void>;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarTablet = ({
  closeModal,
  setSelectedSchedule,
  setSelectedDateString,
  handleMonthChange,
  schedule,
  selectedSchedule,
  handleSelectedSchedule,
  setOpenedSchedule,
  month,
  setMonth,
}: Temp) => {
  const { Calendar, selectedDate, setSelectedDate } = useCalendar();

  useEffect(() => {
    setOpenedSchedule();
  }, [month]);

  useEffect(() => {
    const days = document.getElementsByClassName('calendar-date-box');

    for (let x = 0; x < days.length; x++) {
      schedule?.map((item) => {
        if (item.date.slice(8, 10) === days[x].innerHTML.padStart(2, '0')) {
          days[x].classList.add('booked-date');
        }
      });
    }
  });

  return (
    <aside className="calendar-tablet">
      <div className="calendar-tablet-header">
        <h3>날짜</h3>
        <img
          src="/assets/icons/icon-closed.svg"
          onClick={() => {
            closeModal();
            setSelectedSchedule(null);
            setSelectedDate(new Date());
            setSelectedDateString('');
            setMonth((new Date().getMonth() + 1).toString().padStart(2, '0'));
          }}
        />
      </div>
      <Calendar
        onChange={() => setSelectedSchedule(null)}
        onChangeMonth={handleMonthChange}
        size="small"
        tileContent={(date: Date) => {
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
      <h3>예약 가능한 시간</h3>
      <div className="time-box-parent">
        {schedule &&
          schedule.map(
            (schedule) =>
              selectedDate.getDate().toString().padStart(2, '0') === schedule.date.slice(8, 10) &&
              schedule.times.map((time) => (
                <div
                  key={time.id}
                  className={`time-box ${time.id === selectedSchedule ? 'selected' : ''}`}
                  onClick={() => {
                    handleSelectedSchedule(time.id);
                    setSelectedDateString(`${schedule.date} ${time.startTime} ~ ${time.endTime}`);
                  }}
                >
                  {time.startTime}~{time.endTime}
                </div>
              )),
          )}
      </div>
      <Button className="button-black" onClick={closeModal} disabled={selectedSchedule ? false : true}>
        예약하기
      </Button>
    </aside>
  );
};

export default CalendarTablet;
